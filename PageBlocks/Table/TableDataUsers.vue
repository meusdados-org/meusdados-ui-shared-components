<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="th in tableHeader" :key="th"
                        :class="{ 'icons': isBooleanColumn(th), 'canBeSorted': !isBooleanColumn(th) }"
                        v-on:click="sort(th)">
                        <BodyMedium strong>
                            {{ th.label }}
                            <Icon type="chevron-down" size="1rem" v-if="sorted && sortedBy === th" />
                            <Icon type="chevron-up" v-if="!sorted && sortedBy === th" />
                        </BodyMedium>
                    </th>
                    <th v-if="actions" class="icons">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(td, i) in tableEntries.slice(this.start, this.stop)" :key="td">
                    <td v-for="column in tableHeader" :key="column">
                        <div v-if="column.key === 'status'" class="icons">
                            <ButtonSwitch label="status" :value="td[column.key]" @switchFlag="changeStatus(td)"
                                :showLabel="false" />
                        </div>
                        <div v-else-if="column.key === 'ativo'" class="icons">
                            <ButtonSwitch label="ativo" :value="td[column.key]" @switchFlag="changeAtivo(td)"
                                :showLabel="false" />
                        </div>
                        <div
                            v-else-if="(td[column.key] === true || td[column.key] === false) && column.key !== 'ativo' && column.key !== 'status'">
                            <div v-if="(td[column.key] === false && column.reverse) || (td[column.key] === true && !column.reverse)"
                                class="icons">
                                <slot name="boolIcon">
                                    <Icon size="12px" type="check" />
                                </slot>
                            </div>
                        </div>
                        <div v-else-if="column.key.includes('data')">{{ td[column.key] ? dataConversor(td[column.key]) :
                            '-' }}</div>
                        <div v-else>{{ (td[column.key] || '-').toString().substring(0, 50) }}
                            <span v-if="(td[column.key] || '').toString().length >= 50">
                                <Tooltip :adjust-top="i === 0">
                                    <template #icon>
                                        ...
                                    </template>{{ td[column.key] }}
                                </Tooltip>
                            </span>
                        </div>
                    </td>
                    <td v-if="actions">
                        <div class="action-buttons">
                            <div v-if="canEdit">
                                <ButtonLink title="Editar">
                                    <Icon size="1.25rem" type="edit" v-on:click="editar(td.id)" />
                                </ButtonLink>
                            </div>
                            <div v-if="canDownload">
                                <ButtonLink title="Baixar">
                                    <Icon class="download" size="1.25rem" type="download"
                                        v-on:click="download(td[fileNameLabel])" />
                                </ButtonLink>
                            </div>
                            <div v-if="canDelete">
                                <ButtonLink title="Excluir">
                                    <Icon class="delete" size="1.25rem" type="trash-2"
                                        v-on:click="deletar(td.id || td.file_name)" />
                                </ButtonLink>
                            </div>
                            <div v-if="customAction">
                                <ButtonLink>
                                    <slot :id="td.id" :item="td"></slot>
                                </ButtonLink>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="arrows-table">
        <ButtonPagination ref="pagination" :entries="tableEntries" :itemsPerTable="itemsPerTable"
            v-on:changePage="changePage" />
    </div>
</template>

<script>
import { dataConversor } from '@/utils/data';
import Icon from '@/components/shared/Icon/Icon.vue';
import BodyMedium from '@/components/shared/Typography/Body/BodyMedium.vue';
import ButtonPagination from '@/components/shared/Actions/ButtonPagination.vue';
import ButtonSwitch from '@/components/shared/Actions/ButtonSwitch.vue';
import Tooltip from '../../Inputs/Tooltip/Tooltip.vue';
import { CallBackend } from '@/services/_backend';
import ButtonLink from '../../Actions/ButtonLink.vue';
import { UsersActive } from '@/services/userActive';

const itemsPerTable = 10;

export default {
    name: "TableDataUsers",
    props: {
        columns: Array,
        entries: Array,
        service: CallBackend,
        canDelete: Boolean,
        search: {
            required: false,
            default: ''
        },
        canEdit: {
            type: Boolean,
            required: false,
            default: true
        },
        canDownload: {
            type: Boolean,
            required: false,
            default: false
        },
        customAction: {
            type: Boolean,
            required: false,
            default: false
        },
        actions: {
            type: Boolean,
            required: false,
            default: true
        },
        filters: {
            type: Array,
            default: () => []
        },
        fileNameLabel: {
            type: String,
            default: 'file_name'
        }
    },
    data() {
        return {
            itemsPerTable: itemsPerTable,
            start: 0,
            stop: itemsPerTable,
            tableEntries: this.entries,
            ativo: false,
            sorted: false,
            sortedBy: undefined
        }
    },
    computed: {
        tableHeader() {
            return this.columns || [];
        },
    },
    components: { Icon, ButtonPagination, ButtonSwitch, Tooltip, ButtonLink, BodyMedium },
    watch: {
        search() {
            this.tableEntries = this.entries.filter(entry => {
                const entriesMapped = this.columns.map(header =>
                    entry[header.key]
                )
                const values = Object.values(entriesMapped);
                const mappedValues = values.map(value => {
                    const typedSearches = this.search.split(' ').map(x => x.trim());
                    return typedSearches.some(typedSearch => {
                        const result = (
                            (typeof value === "string" || typeof value === "number") && (
                                String(value).toLowerCase().includes(typedSearch.toLowerCase())
                            )
                        )
                        return result
                    });
                });
                return mappedValues.some(x => x);
            })
            this.$refs.pagination.updatePageCounting(this.tableEntries);
        },
        filters() {
            this.tableEntries = [...this.entries];
            this.filters.forEach(filter => {
                this.tableEntries = this.tableEntries.filter(entry => {
                    return this.compareEntry(entry[filter.header.key], filter.selected);
                })
            })
        },
        entries() {
            this.tableEntries = this.entries;
            this.$refs.pagination.updatePageCounting(this.tableEntries);
        }
    },
    methods: {
        dataConversor: dataConversor,
        isBooleanColumn(th) {
            if (this.tableEntries.length <= 0) {
                return false;
            }
            return this.tableEntries[0][th.key] === true || this.tableEntries[0][th.key] === false;
        },
        changePage(start, stop) {
            this.start = start;
            this.stop = stop;
        },
        editar(id) {
            if (this.$.vnode.props?.onEditar) {
                this.$emit('editar', id);
            } else {
                const path = `${this.$route.path}/editar/${id}`;
                this.$router.push({ path });
            }
        },
        compareEntry(entry, filter) {
            if (entry === undefined || entry === null || entry === '') {
                return filter === 'Não informado'
            } else if (typeof entry === 'boolean') {
                return entry ? filter === 'Sim' : filter === 'Não';
            } else if (Array.isArray(entry)) {
                const filterArray = filter.split(', ');
                return entry.all(x => filterArray.includes(x));
            }
            return filter === entry || dataConversor(entry) === filter;

        },
        deletar(id) {
            //Impede excluir quando há apenas um usuário
            if (this.tableEntries.length == 1) {
                this.$dialog({
                    type: 'error',
                    title: 'Operação inválida.',
                    message: 'Não é possível excluir o único usuário registrado'
                })
                return
            }
            if (this.service) {
                this.$dialog({
                    type: 'alert',
                    title: "Tem certeza que deseja excluir esse registro?",
                    message: "Após excluido, não será possível recuperá-lo.",
                    showCancelButton: true,
                }).then(() => {
                    new this.service().delete(id).then(() => {
                        const entriesCopy = this.entries;
                        const index = entriesCopy.findIndex(entry => entry.id === id);
                        entriesCopy.splice(index, 1);
                        this.$emit('delete', entriesCopy);
                        this.$refs.pagination.deleteItem(entriesCopy);
                        this.$emit('usuarioStatusAlterado');
                    }).catch(error => {

                        this.$dialog({ title: 'Erro ao deletar!', message: error.response.data.error_message, type: 'error' });
                    })
                })
            } else {
                this.$emit('delete', id)
            }
        },
        download(file_name) {
            this.$emit('download', file_name);
        },
        changeAtivo(td) {
            td.ativo = !td.ativo;
            new this.service().updateAtivo(td.id, td).then(() => { }).catch(error => {
                this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error' });
                td.ativo = !td.ativo;
            })
        },
        async changeStatus(td) {

            td.status = !td.status;
            try {
                const usersCount = await new UsersActive().getInfo();
                const users = usersCount.data.Usuarios;
                if (users === 3 && td.status === true) {
                    this.$dialog({
                        title: 'Limite atingido',
                        message: 'O número máximo de usuários ativos já foi atingido.',
                        type: 'alert'
                    });
                    td.status = !td.status;
                    return;
                }
                await new this.service().updateStatus(td.id, td.status);
                this.$emit('usuarioStatusAlterado');
            } catch (error) {
                this.$dialog({
                    title: 'Erro ao atualizar status!',
                    message: error.response?.data?.error_message || 'Erro inesperado.',
                    type: 'error'
                });
                td.status = !td.status;
            }
        },
        sort(th) {
            if (this.isBooleanColumn(th)) {
                return;
            }
            if (this.sortedBy === th && this.sorted) {
                this.tableEntries = this.tableEntries.reverse();
                this.sorted = false;
            } else if (!this.sortedBy && !this.sorted) {
                this.tableEntries = this.tableEntries.sort((a, b) => {
                    if (th.key && th.key.includes('data')) {
                        return new Date(a[th.key]) - new Date(b[th.key]);
                    }
                    if (a[th.key] < b[th.key]) {
                        return -1;
                    }
                    if (a[th.key] > b[th.key]) {
                        return 1;
                    }
                    return 0;
                })
                this.sorted = true;
                this.sortedBy = th;
            } else {
                this.tableEntries = [...this.entries];
                this.sortedBy = undefined;
            }


        }
    },
    created() {
        this.tableEntries = this.entries;
    },
}
</script>

<style scoped>
.table-wrapper {
    overflow: auto;
    color: transparent;
    border-radius: var(--border-radius-small);
    margin-top: var(--spacing-small);
    max-height: 70vh;
    box-shadow: var(--box-shadow-1);
}

.table {
    border-radius: var(--border-radius-small);
    font-size: 12px;
    font-weight: normal;
    width: 100%;
    border: none;
    border-collapse: collapse;
    background-color: white;
    word-wrap: break-word;
}

.table th {
    position: sticky;
    top: 0;
    z-index: 1;
}

.table td,
.table th {
    text-align: left;
    padding: var(--spacing-small);
    min-width: fit-content;
    max-width: var(--spacing-xxxlarge);
}

th.icons {
    text-align: center !important;
}

div.icons {
    text-align: center !important;
    display: flex;
    justify-content: center;
    align-items: center;
}


.table th {
    padding: var(--spacing-small);
    color: var(--black);
}

.table tbody {
    color: var(--gray-1);
}

.table tr:nth-child(odd) {
    background-color: var(--gray-4);
}

.table th {
    background-color: #FFF;
}


.table>thead {
    width: 100%;
}

.action-buttons {
    display: flex;
    justify-content: center;
    column-gap: var(--spacing-xsmall);
}

.edit {
    color: var(--blue-1);
    cursor: pointer;
}

.delete {
    color: var(--red-1);
    cursor: pointer;
}

.delete:hover {
    color: var(--purple-1);
}

.download {
    color: var(--blue-2);
    cursor: pointer;
}

.arrows-table {
    display: flex;
    justify-content: right;
    column-gap: 20px;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-small);
}

.canBeSorted {
    cursor: pointer;
}
</style>
