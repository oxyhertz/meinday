<template>
    <section class="board-title-container" v-if="board">
        <h1 v-if="isEditable" class="board-title single-line" v-tooltip="'Click to Edit'">{{ board.title }}</h1>
    </section>
</template>
<script>
export default {
    name: 'board-name-heading',
    data() {
        return {
            isEditable: false,
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
    }
}
</script>
<style lang="scss" scoped>
.board-title-container {
    display: flex;

}

h1.board-title {
    font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 40px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 4px;
    min-width: 0;
    padding: 0 4px;

    &:hover {
        cursor: text;
        border: 1px solid;
        border-color: #e6e9ef;
    }

}
</style>