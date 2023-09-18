<template>
    <span>
        {{this.contador}} de {{pageCounting}}
    </span>
    <div v-if="pageCounting == 0 ">
        <span>Sem lista</span>
    </div>
    <div v-else class="buttons-pagination" :class="{'disabled': this.contador == 1 && this.contador == pageCounting}">
        <div>
            <ButtonIconOutline :disabled="this.contador == 1" v-on:click="voltar" type="arrow-left" />
        </div>
        <span class="contador">{{this.contador}}</span>
        <div>
            <ButtonIcon :disabled="this.contador == pageCounting" v-on:click="avançar" type="arrow-right" />
        </div>
    </div>
</template>

<script>
import ButtonIcon from '@/components/shared/Actions/ButtonIcon.vue';
import ButtonIconOutline from './ButtonIconOutline.vue';

export default {
    name: "ButtonPagination",
    props: {
        itemsPerTable: {
            type: Number,
            required: false,
            default: 10
        },
        entries: {
            type: Array,
            required: true,
        },
    },
    components: {
        ButtonIcon,
        ButtonIconOutline
    },
    data() {
        return {
            contador: 1,
            start: 0,
            stop: this.itemsPerTable,
            pageCounting: Number,
        }
    },
    created() {
        this.start = 0;
        this.stop = this.itemsPerTable;
        this.updatePageCounting(this.entries);
    },
    watch: {
        entries() {
            this.updatePageCounting(this.entries);
        }
    },
    methods: {
        deleteItem(entries) {
            this.updatePageCounting(entries);
            if (this.contador > this.pageCounting) {
                this.contador--;
                this.start -= this.itemsPerTable;
                this.stop -= this.itemsPerTable;
            }
        },
        updatePageCounting(entries) {
            this.pageCounting = Math.ceil(entries.length / this.itemsPerTable);
        },
        voltar() {
            if (this.contador > 1) {
                this.contador--;
                this.start -= this.itemsPerTable;
                this.stop -=this.itemsPerTable;
            }
            this.$emit('changePage', this.start, this.stop);
        },
        avançar() {
            if (this.contador < this.pageCounting) {
                this.contador++;
                this.start += this.itemsPerTable;
                this.stop += this.itemsPerTable;
            }
            this.$emit('changePage', this.start, this.stop);
        }
    },
}
</script>

<style scoped>
.buttons-pagination{
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
}

.contador{
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: var(--border-radius-small);
    background-color: var(--white);
    border: solid 1px var(--black);
    justify-content: center;
    align-items: center;
}

.buttons-pagination:hover:not(.disabled) .contador {
    border-color: var(--purple-1);
}

</style>