<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="th in tableHeader" :key="th" :class="{'icons': isBooleanColumn(th), 'canBeSorted': !isBooleanColumn(th)}" v-on:click="sort(th)">
                        {{ th.label }} <Icon type="chevron-down" size="1rem" v-if="sorted && sortedBy === th"/> <Icon type="chevron-up" v-if="!sorted && sortedBy === th"/>
                    </th>
                    <th v-if="actions" class="icons">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="td in tableEntries.slice(this.start, this.stop) " :key="td">
                    <td v-for="column in tableHeader" :key="column">
                        <div v-if="column.key === 'ativo'" class="icons">
                            <ButtonSwitch label="ativo" :value="td[column.key]" @switchFlag="changeAtivo(td)" :showLabel="false"/>
                        </div>
                        <div v-else-if="td[column.key] === true || td[column.key] === false">
                            <div v-if="td[column.key] === true" class="icons">
                                <Icon size="12px" type="check"/>
                            </div>
                        </div>
                        <div v-else-if="column.key.includes('data')">
                            {{ td[column.key] ? dataConversor(td[column.key]) : '-' }}
                        </div>
                        <div v-else>
                            {{(td[column.key] || '-').toString().substring(0, 50)}}<span v-if="(td[column.key] || '').toString().length >= 50">...</span>
                        </div>
                    </td>
                    <td v-if="actions">
                        <div class="action-buttons">
                            <div v-if="canEdit">
                                <Icon class="edit" size="1.25rem" type="edit" v-on:click="editar(td.id)"/>
                            </div>
                            <div v-if="canDownload">
                                <Icon class="download" size="1.25rem" type="download" v-on:click="download(td.file_name)"/>
                            </div>
                            <div v-if="canDelete">
                                <Icon class="delete" size="1.25rem" type="x-square" v-on:click="deletar(td.id || td.file_name)" />
                            </div>
                            <div v-if="customAction">
                                <slot :id="td.id" :item="td"></slot>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="arrows-table">
        <ButtonPagination ref="pagination" :entries="tableEntries" :itemsPerTable="itemsPerTable" v-on:changePage="changePage" />
    </div>
</template>

<script>
import { dataConversor } from '@/utils/data';
import Icon from '../Icon/Icon.vue';
import ButtonPagination from '../Button/ButtonPagination.vue';
import ButtonSwitch from '../Button/ButtonSwitch.vue';
import { CallBackend } from '@/services/_backend';

const itemsPerTable = 10;

export default {
    name: "TableData",
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
        }
    },
    data(){
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
    components: { Icon, ButtonPagination, ButtonSwitch },
    watch: {
        search() {
            this.tableEntries = this.entries.filter(entry => {
                const entriesMapped = this.columns.map(header =>
                    entry[header.key]
                )
                const values = Object.values(entriesMapped);
                const mappedValues = values.map(value => (typeof value === "string" || typeof value === "number") && String(value).toLowerCase().includes(this.search.toLowerCase()));
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
            const path = `${this.$route.path}/editar/${id}`;
            this.$router.push({ path });
        },
        compareEntry(entry, filter) {
            console.log(typeof entry, entry, filter)
            if (typeof entry === 'boolean') {
                return entry ? filter === 'Sim' : filter === 'Não';
            } else if (Array.isArray(entry)) {
                const filterArray = filter.split(', ');
                return entry.all(x => filterArray.includes(x));
            }
            return filter === entry || dataConversor(entry) === filter;

        },
        deletar(id) {
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
                    }).catch(error => {
                        console.log(error)
                        this.$dialog({title: 'Erro ao deletar!', message: error.response.data.error_message, type: 'error'});
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
            new this.service().updateAtivo(td.id, td).then(() => {}).catch(error => {
                this.$dialog({ title: 'Não autorizado!', message: error.response.data.error_message, type: 'error'});
                td.ativo = !td.ativo;
            })
        },
        sort(th) {
            if (this.isBooleanColumn(th)) {
                return;
            }
            if (this.sortedBy === th && this.sorted) {
                this.tableEntries = this.tableEntries.reverse();
                this.sorted = false;
            } else if (!this.sortedBy && !this.sorted){
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
    border-radius: var(--border-radius-1);
    max-height: 70vh;
    box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 20%);
}

.table {
    border-radius: var(--border-radius-1);
    font-size: 14px;
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

.table td, .table th {
    text-align: left;
    padding: 1rem;
    min-width: fit-content;
    max-width: 10rem;
}

.icons {
    text-align: center !important;
}

.table th {
    padding: 1rem;
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


.table > thead {
    width: 100%;
}

.action-buttons {
    display: flex;
    justify-content: center;
    column-gap: .5rem;
}

.edit {
    color: var(--blue-1);
    cursor: pointer;
}

.delete {
    color: var(--red-1);
    cursor: pointer;
}

.download {
    color: var(--blue-2);
    cursor: pointer;
}

.action-buttons > *:hover {
    opacity: 0.5;
}

.arrows-table{
    display: flex;
    justify-content: right;
    column-gap: 20px;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
}

.canBeSorted {
    cursor: pointer;
}

</style>