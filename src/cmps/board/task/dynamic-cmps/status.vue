<template>
    <section class="status-container" @click="isOpen = !isOpen">
        <span class="status-title">{{ task.status }}</span>
        <VDropdown :distance="17" :triggers="[]" :shown="isOpen">
            <template #popper>
                <label-picker @selectColor="selectColor" :labels="board.statusLabels" />
            </template>
        </VDropdown>
    </section>
</template>
<script>
import labelPicker from './label-picker.vue';
export default {
    name: 'status',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    // computed that get the board from store
    computed: {
        // get the board from store
        board() {
            return this.$store.getters.board;
        },
    },
    methods: {
        // update the task status
        updateStatus(label) {
            this.$store.commit({ type: 'updateTaskStatus', taskId: this.task.id, label });
        },
        selectColor(color, label) {
            const labelCopy = { ...label }
            labelCopy.color = color;
            const boardCopy = { ...this.board }
            boardCopy.statusLabels = boardCopy.statusLabels.map(currLabel => {
                if (currLabel.id === labelCopy.id) return labelCopy;
                return currLabel;
            })
            this.$store.commit({ type: 'updateBoard', board: boardCopy });
        }
    },
    components: {
        labelPicker
    }
}
</script>
