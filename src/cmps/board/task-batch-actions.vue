<template>
    <section class="task-batch-actions" v-if="selectedTasks?.length">
        <div class="nums-of-tasks">{{ selectedTasks?.length }}</div>
        <div class="actions-title">
            <div>Task{{ selectedTasks?.length > 1 ? 's' : ''}} Selected</div>
        </div>
        <div class="batch-actions-item" v-for="action in actions" :key="action.name" @click="action.func">
            <span class="icon">
                <i :class="`${action.icon}`"></i>
            </span>
            <span class="action-name">{{ action.name }}</span>
        </div>
        <div class="close-actions">
            <i class="fa-solid fa-xmark fa-lg" @click="closeTaskBatch()"></i>
        </div>
    </section>
</template>
<script>
import { utils, write } from "xlsx";
export default {
    name: 'task-batch-actions',
    data() {
        return {
            actions: [
                {
                    name: 'Duplicate',
                    icon: 'fa-regular fa-copy',
                    func: this.duplicateTasks
                },
                {
                    name: 'Export',
                    icon: 'fa-regular fa-file-excel',
                    func: this.exportFileExcel
                },
                {
                    name: 'Archive',
                    icon: 'fa-solid fa-box-archive',
                    func: this.archiveTasks
                },
                {
                    name: 'Delete',
                    icon: 'fa-regular fa-trash-can',
                    func: this.removeTasks
                },
                {
                    name: 'Convert',
                    icon: 'fa-solid fa-arrow-turn-down',
                    func: this.convertTasks
                },
                {
                    name: 'Move to',
                    icon: 'fa-regular fa-circle-right',
                    func: this.moveTo
                },
            ]
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        duplicateTasks() {
            this.$store.dispatch({ type: 'duplicateTasks', tasks: this.selectedTasks })
            this.$store.dispatch({ type: 'clearSelectedTasks' })

        },

        exportFileExcel() {
            console.log('Exporting file to excel')
            const dataToExporet = this.selectedTasks.map((task) => {
                const newTask = { ...task }
                delete newTask.style
                delete newTask.comments
                delete newTask.checklists
                return newTask
            })
            // Create a new workbook and add a worksheet to it
            const workbook = utils.book_new();
            const worksheet = utils.json_to_sheet(dataToExporet);
            utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Write the workbook to an XLSX file and prompt the user to download it
            const dataToDownload = new Blob([write(workbook, { bookType: 'xlsx', type: 'array' })], { type: "application/octet-stream" });
            const downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(dataToDownload);
            downloadLink.download = `${this.board.title}-selected-tasks.xlsx`
            downloadLink.click();
        },
        archiveTasks() {
            this.$emit('archive-tasks')
        },

        removeTasks() {
            console.log('hola Removing')
            this.$store.dispatch({ type: 'removeTasks', tasks: this.selectedTasks })
        },

        convertTasks() {
            this.$emit('convert-tasks')
        },

        moveTo() {
            this.$emit('move-to')
        },
        closeTaskBatch() {
            this.$store.dispatch({ type: 'clearSelectedTasks' })

        }

    },
    computed: {
        selectedTasks() {
            return this.$store.getters.selectedTasks;
        },
        board() {
            return this.$store.getters.board;
        }
    },
    components: {

    }
}
</script>
