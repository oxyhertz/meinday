<template>
    <section class="status-container" @click="isOpen = !isOpen" :style="{ 'background-color': status.color }">
        <VDropdown :distance="17" :triggers="[]" :shown="isOpen">
            <span class="status-title">{{ status.title }}</span>
            <template #popper>
                <label-picker :activeLabels="activeLabels" @deleteLabel="deleteLabel" @addNewLabel="addNewLabel"
                    :task="task" @updateLabels="updateLabels" @selectLabel="updateTaskStatus" @selectColor="selectColor"
                    :labels="boardLabels" />
            </template>
        </VDropdown>
        <div class="edge-triangle"></div>
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
        },
        cmpType: {
            type: String,
            // required: true
            default: 'status'
        }
    },
    created() {
        console.log("🚀 ~ file: status.vue:24 ~ type:", this.task)

    },
    data() {
        return {
            isOpen: false,

        }
    },
    // computed that get the board from store
    computed: {
        // get the board from store
        boardLabels() {
            if (this.cmpType === 'status') return this.board.statusLabels;
            else if (this.cmpType === 'priority') return this.board.priorityLabels;
        },
        board() {
            return this.$store.getters.board;
        },
        status() {
            // console.log(';this,board', this.board.statusLabels)
            const labelToDisplay = this.boardLabels.find(label => label.id === this.task[this.cmpType].id)
            return labelToDisplay;
        },
        activeLabels() {
            // task[this.cmpType].id
            const tasks = this.board.groups.reduce((acc, group) => [...acc, ...group.tasks], [])
            return this.boardLabels.filter(label => tasks.some(task => task[this.cmpType].id === label.id))
        },
        dataType() {
            return this.cmpType === 'status' ? 'statusLabels' : 'priorityLabels';
        }
    },
    methods: {
        addNewLabel() {
            const newLabel = boardService.getEmptyLabel();
            this.updateLabels([...this.boardLabels, newLabel])
        },
        deleteLabel(label) {
            const labels = this.boardLabels.filter(currLabel => currLabel.id !== label.id)
            this.updateLabels(labels)
        },
        // update the task status,
        updateLabels(labels, label) {
            const boardCopy = JSON.parse(JSON.stringify(this.board))

            boardCopy[this.dataType] = [...labels];
            this.$store.dispatch({ type: 'updateBoard', board: boardCopy });

        },
        // update the task status,
        updateTaskStatus(label) {
            const boardCopy = JSON.parse(JSON.stringify(this.board))
            const copyTask = { ...this.task };
            copyTask[this.cmpType] = label;
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
            boardCopy[this.dataType] = this.boardLabels.map(currLabel => {
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
    position: relative;

    .edge-triangle {
        transition: border-width .3s .2s ease;
        position: absolute;
        top: 0;
        right: 0;
        border-style: solid;
        border-color: rgba(0, 0, 0, .2) #ffffff;
        border-width: 0;
    }

    &:hover {
        .edge-triangle {
            border-width: 0 10px 10px 0;
        }
    }

}
</style>