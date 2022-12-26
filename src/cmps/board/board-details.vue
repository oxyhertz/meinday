<template>
    <section class="board-details" v-if="board">
        <h2>{{ board.title }}</h2>
        <group-list @updateGroups="updateBoard" :groups="board.groups" :board="board" />
    </section>
</template>
<script>
import groupList from './group/group-list.vue'
export default {
    name: 'board-details',
    methods: {
        updateBoard(groups) {
            const newBoard = JSON.parse(JSON.stringify(this.board))
            newBoard.groups = groups
            this.$store.dispatch({ type: "updateBoard", board: newBoard })
        }
    },
    watch: {
        boardId: {
            handler() {
                if (this.boardId) {
                    this.$store.dispatch({ type: "loadBoard", boardId: this.boardId })
                }
            },
            immediate: true,
        },
    },
    components: {
        groupList
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        boardId() {
            return this.$route.params.boardId
        },
    },
    unmounted() {
        this.$store.commit({ type: "setBoard", board: null })
    },

}
</script>
