<template>
    <section class="status-container" @click="isOpen = !isOpen" :style="{ 'background-color': status.color }">
        <span class="status-title">{{ status.title }}</span>
        <VDropdown :distance="17" :triggers="[]" :shown="isOpen">
            <template #popper>
                <label-picker :activeLabels="activeLabels" @deleteLabel="deleteLabel" @addNewLabel="addNewLabel"
                    :task="task" @updateLabels="updateLabels" @selectLabel="updateTaskStatus" @selectColor="selectColor"
                    :labels="board.statusLabels" />
            </template>
        </VDropdown>
    </section>
</template>
<script>
import labelPicker from './label-picker.vue';
import { boardService } from '../../../../services/board.service.local';
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
        status() {
            // console.log(';this,board', this.board.statusLabels)
            const labelToDisplay = this.board.statusLabels.find(label => label.id === this.task.status.id)
            return labelToDisplay;
        },
        activeLabels() {
            // task.status.id
            const tasks = this.board.groups.reduce((acc, group) => [...acc, ...group.tasks], [])
            return this.board.statusLabels.filter(label => tasks.some(task => task.status.id === label.id))
        }
    },
    methods: {
        addNewLabel() {
            const newLabel = boardService.getEmptyLabel();
            this.updateLabels([...this.board.statusLabels, newLabel])
        },
        deleteLabel(label) {
            const labels = this.board.statusLabels.filter(currLabel => currLabel.id !== label.id)
            this.updateLabels(labels)
        },
        // update the task status,
        updateLabels(labels, label) {
            const boardCopy = JSON.parse(JSON.stringify(this.board))
            boardCopy.statusLabels = [...labels];
            this.$store.dispatch({ type: 'updateBoard', board: boardCopy });

        },
        // update the task status,
        updateTaskStatus(label) {
            const boardCopy = JSON.parse(JSON.stringify(this.board))
            const copyTask = { ...this.task };
            copyTask.status = label;
            const groupIdx = boardCopy.groups.findIndex((group) =>
                group.tasks.some((currTask) => currTask.id === copyTask.id)
            )
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(
                (currTask) => currTask.id === copyTask.id
            )
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, copyTask)
            this.$store.dispatch({ type: 'updateBoard', board: boardCopy });

        },
        selectColor(color, label) {
            const labelCopy = { ...label }
            labelCopy.color = color;
            const boardCopy = { ...this.board }
            boardCopy.statusLabels = boardCopy.statusLabels.map(currLabel => {
                if (currLabel.id === labelCopy.id) return labelCopy;
                return currLabel;
            })
            this.$store.dispatch({ type: 'updateBoard', board: boardCopy });
        }
    },
    components: {
        labelPicker
    }
}
</script>
<style lang="scss" >
.status-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>