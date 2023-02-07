<template>
    <div class="task-name">
        <arrow-down :color="'#c3c6d4'" />
        <p v-if="!isEditable" @click="isEditable = !isEditable" v-focus v-click-outside="() => isEditable = false"
            class="task-title">{{ task.title }}</p>
        <div class="expand-task" v-tooltip="'Open item page'">
            <expand-icon />
            <span>Open</span>
        </div>
    </div>
    <div class="open-chat">
        <chat-grey />
    </div>
</template>
<script>
import arrowDown from '../../icons/arrow-down.vue';
import chatGrey from '../../icons/chat-grey.vue';
import expandIcon from '../../icons/expand-icon.vue';

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    name: '',
    data() {
        return {
            isEditing: false

        }
    },
    components: {
        arrowDown,
        expandIcon,
        chatGrey
    },

}
</script>
