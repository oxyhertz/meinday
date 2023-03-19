<template>
    <section class="chat-pulse-container">
        <span>
            <i class="fa-solid fa-x"></i>
        </span>
        <section class="heading">
            <div class="task-title" v-tooltip="'Click to edit heading'">
                <h2>Task name</h2>
            </div>
            <input class="task-title-input" type="text" v-if="isHeadingOnEdit">
            <div class="task-members">Mem</div>
            <div>
                <pulse-menu-button />
            </div>
        </section>
        <h1>Chat pulse</h1>
        <QuillEditor theme="snow" v-model:content="content" contentType="html" @editorChange="onChange" />
        <div v-html="content"></div>
    </section>
</template>
<script>
import pulseMenuButton from '../../pulse-menu-button.vue';
export default {
    name: 'chat-pulse',
    data() {
        return {
            content: '',
            isHeadingOnEdit: true,
            task: null
        }
    },
    async created() {
        const taskId = this.$route.params.taskId
        this.task = await this.$store.dispatch({ type: "loadCurrentTask", taskId })
        console.log('this.task:', this.task);

    },
    computed: {
        // taskId() {
        //     return this.$route.params.taskId
        // },
    },
    methods: {
        onChange(info) {
            console.log(this.content)
            console.log('info:', info);
        },

    },
    components: {
        pulseMenuButton
    }
}
</script>
