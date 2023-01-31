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
            <span v-tooltip="'Show board description'">
                <exclamation-mark-icon />
            </span>
            <span v-tooltip="`${isFavoriteBoard ? 'Remove' : 'Add'} to favorites`" @click="onToggleFavBoard"
                v-if="loggedinUser">
                <i :class="`fa-${isFavoriteBoard ? 'solid' : 'regular'} fa-star`"></i>
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
    created() {
        console.log(this.loggedinUser)
    },
    methods: {
        selectEmoji(emoji) {
            console.log("🚀 ~ file: board-name-heading.vue:25 ~ selectEmoji ~ emoji", emoji)

        },
        onToggleFavBoard() {
            const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
            if (this.isFavoriteBoard) {
                user.boards.splice(user.boards.indexOf(this.board._id), 1)
            } else {
                user.boards.push(this.board._id)
            }

            this.$store.dispatch({ type: "updateUser", user })

            console.log('user', user.boards)
            console.log("🚀 ~ file: board-name-heading.vue:42 ~ onToggleFavBoard ~ user", user)

        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        isFavoriteBoard() {
            return this.loggedinUser.boards?.includes(this.board._id)

        }
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