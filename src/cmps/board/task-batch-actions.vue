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
            <i class="fa-solid fa-xmark fa-lg"></i>
        </div>
    </section>
</template>
<script>
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
            this.$emit('duplicate-tasks')
            this.$store.dispatch({ type: 'duplicateTasks', tasks: this.selectedTasks })

        },

        exportFileExcel() {
            this.$emit('export-file-excel')
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
        }

    },
    computed: {
        selectedTasks() {
            return this.$store.getters.selectedTasks;
        }
    },
    components: {

    }
}
</script>
