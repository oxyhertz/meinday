<template>
    <section class="chat-pulse-container" v-if="task">
        <span class="close-icon">
            <i class="fa-solid fa-x" @click="goBack()"></i>
        </span>
        <section class="heading">
            <div class="task-title" @click="isHeadingOnEdit = !isHeadingOnEdit" v-tooltip="'Click to edit heading'"
                v-if="!isHeadingOnEdit">
                <h2>{{ task.title }}</h2>
            </div>
            <input v-model="task.title" @input="upadteTask" v-focus class="task-title-input" type="text"
                v-if="isHeadingOnEdit" v-click-outside="() => isHeadingOnEdit = false">
            <!-- <div class="task-members">
                <div class="member" v-for="member in task.members" :key="member._id">
                    <img :src="member.imgUrl" alt="">
                </div>
            </div> -->
            <div>
                <sub-popup>
                    <template v-slot:button>
                        <pulse-menu-button />
                    </template>
                    <h2>kurwa</h2>
                </sub-popup>
            </div>
        </section>
        <section class="quil-wrapper">
            <QuillEditor placeholder="Write an update..." ref="editor"
                :toolbar="['bold', 'italic', 'underline', { 'list': 'ordered' }, { 'list': 'bullet' }]" theme="snow"
                v-model:content="content" contentType="html" @editorChange="onChange" />
        </section>
        <button class="update-msg" @click="addMessage">Update</button>
        <div v-html="content"></div>
        <div class="messages-container">
            <messsage-preview v-for="msg in task.comments" :key="msg.id" :msg="msg" />
        </div>
    </section>
</template>
<script>
import pulseMenuButton from '../../pulse-menu-button.vue';
import { boardService } from '../../../services/board.service.local';
import messsagePreview from './messsage-preview.vue';
import subPopup from '../../popups/sub-popper.vue';
export default {
    name: 'chat-pulse',
    data() {
        return {
            content: '',
            isHeadingOnEdit: false,
            task: null
        }
    },

    watch: {
        taskId: {
            async handler() {
                if (this.taskId) {
                    this.task = await this.$store.dispatch({ type: "loadCurrentTask", taskId: this.taskId })
                }
            },
            immediate: true,
        },
    },
    computed: {
        taskId() {
            return this.$route.params.taskId
        },
    },
    methods: {
        onChange(info) {
            console.log(this.content)
        },
        addMessage() {
            const taskCopy = JSON.parse(JSON.stringify(this.task))
            const msg = boardService.getChatMsg(this.content)
            taskCopy.comments.unshift(msg)
            this.task = taskCopy
            this.upadteTask()
            this.content = ''
            // Plaster to reset contenteditable div
            document.querySelector('.ql-editor').innerHTML = ''
        },
        upadteTask() {
            this.$store.dispatch({ type: "updateTask", task: JSON.parse(JSON.stringify(this.task)) })
        },

        goBack() {
            this.$router.push(`/board/${this.$route.params.boardId}`)
        }

    },
    components: {
        pulseMenuButton, messsagePreview, subPopup

    }
}
</script>
<style scoped>
.fa-x {
    cursor: pointer;
    color: #4b4b4b;
}

.close-icon {
    margin-inline-start: 4px;
}
</style>