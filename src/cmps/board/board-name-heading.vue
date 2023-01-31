<template>
    <section class="board-title-container" v-if="board">
        <h1 v-if="!isEditable" @click="isEditable = !isEditable" class="board-title single-line heading-text"
            v-tooltip="'Click to Edit'">{{ board.title }}</h1>
        <span class="title-input-container" v-else>
            <input class="title-input heading-text" v-click-outside="() => isEditable = false" type="text" name=""
                v-model="board.title">
            <span class="emoji-picker-input">
                <emoji-picker @selectEmoji="selectEmoji" />
            </span>
        </span>

        <section class="icon-actions">
            <span>
                <exclamation-mark-icon />
            </span>
            <span>
                <i class="fa-regular fa-star"></i>
            </span>
        </section>
    </section>
</template>

<script>
import emojiPicker from '../custom-emoji-picker.vue';
import exclamationMarkIcon from '../icons/exclamation-mark-icon.vue';
export default {
    name: 'board-name-heading',
    data() {
        return {
            isEditable: false,
            isEmojiMenuOpen: false
        }
    },
    methods: {
        selectEmoji(emoji) {
            console.log("🚀 ~ file: board-name-heading.vue:25 ~ selectEmoji ~ emoji", emoji)

        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
    },
    components: {
        emojiPicker,
        exclamationMarkIcon
    }
}
</script>
<style lang="scss" scoped>
h1.board-title {
    border: 1px solid rgba(0, 0, 0, 0);

    &:hover {
        cursor: text;
        border: 1px solid;
        border-color: #e6e9ef;
    }

}
</style>