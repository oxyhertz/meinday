<template>
    <section class="chat-pulse-container" v-if="task">
        <span>
            <i class="fa-solid fa-x"></i>
        </span>
        <section class="heading">
            <div class="task-title" @click="isHeadingOnEdit = !isHeadingOnEdit" v-tooltip="'Click to edit heading'"
                v-if="!isHeadingOnEdit">
                <h2>{{ task.title }}</h2>
            </div>
            <input v-model="task.title" @input="upadteTask" v-focus class="task-title-input" type="text"
                v-if="isHeadingOnEdit" v-click-outside="() => isHeadingOnEdit = false">
            <div class="task-members">
                <div class="member" v-for="member in task.members" :key="member._id">
                    <img :src="member.imgUrl" alt="">
                </div>`

            </div>
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
            isHeadingOnEdit: false,
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
        upadteTask() {
            this.$store.dispatch({ type: "updateTask", task: this.task })
        }

    },
    components: {
        pulseMenuButton
    }
}
</script>
