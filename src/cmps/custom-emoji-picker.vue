<template>
    <span class="emoji-picker">
        <emojiIcon @click="toggleEmoji" />
        <EmojiPicker v-if="isEmojiMenuOpen" :native="true" @select="onSelectEmoji" />
    </span>
</template>
<script>
import emojiIcon from './icons/emoji-icon.vue'
import EmojiPicker from 'vue3-emoji-picker'

export default {
    name: 'custon-emoji-picker',
    data() {
        return {
            isEmojiMenuOpen: false,
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.$emit('selectEmoji', emoji)
        },
        toggleEmoji() {
            this.isEmojiMenuOpen = !this.isEmojiMenuOpen
            console.log('test')
        }
    },
    computed: {

    },
    components: {
        emojiIcon,
        EmojiPicker
    }
}
</script>
