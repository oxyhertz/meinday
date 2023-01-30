<template>
    <section v-if="board">
        <h1 class="board-title single-line" v-tooltip="">{{ board.title }}</h1>
    </section>
</template>
<script>
export default {
    name: 'board-name-heading',
    computed: {
        board() {
            return this.$store.getters.board
        },
    }
}
</script>
<style lang="scss" scoped>
h1.board-title {
    font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 40px;
}
</style>