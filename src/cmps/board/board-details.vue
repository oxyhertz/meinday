<template>
    <section class="board-details" v-if="board">
        <workspace-menu />
        <main>
            <board-name-heading />
            <group-list @updateGroups="updateBoard" :groups="board.groups" :board="board" />
        </main>
    </section>
</template>
<script>
import workspaceMenu from './workspace-menu.vue'
import groupList from './group/group-list.vue'
import boardNameHeading from './board-name-heading.vue'
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
        board: {
            handler() {
                console.log('holaas')
                // if (this.boardId) {
                //     this.$store.dispatch({ type: "loadBoard", boardId: this.boardId })
                // }
            },
            immediate: true,
        },
    },
    components: {
        groupList,
        workspaceMenu,
        boardNameHeading
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
