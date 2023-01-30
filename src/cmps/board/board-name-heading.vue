<template>
    <section class="board-title-container" v-if="board">
        <h1 v-if="!isEditable" @click="isEditable = !isEditable" class="board-title single-line heading-text"
            v-tooltip="'Click to Edit'">{{ board.title }}</h1>
        <input class="title-input heading-text" v-click-outside="() => isEditable = false" v-else type="text" name=""
            v-model="board.title">
        <section class="icon-actions">
            <emoji-picker @selectEmoji="selectEmoji" />
        </section>
    </section>
</template>

<script>
import emojiPicker from '../custom-emoji-picker.vue';
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
        emojiPicker
    }
}
</script>
<style lang="scss" scoped>
.board-title-container {
    display: flex;

    .title-input {
        background-color: #ffffff;
        display: inline-block;
        // width: 100%;
        max-height: 100%;
        margin: auto 0;
        padding: 0 4px;
        outline: none;
        border: 1px solid;
        border-color: #0085ff;
        vertical-align: top;
        text-align: left;
    }

}

h1.board-title {
    border: 1px solid rgba(0, 0, 0, 0);

    &:hover {
        cursor: text;
        border: 1px solid;
        border-color: #e6e9ef;
    }

}
</style>