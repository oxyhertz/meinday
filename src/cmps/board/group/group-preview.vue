<template>
    <section class="group-preview">
        <section class="lables" :style="{ display: 'flex' }">
            <div>Task</div>
            <Container orientation="horizontal" :style="{ display: 'flex' }" @drop="onDrop">
                <Draggable v-for="(cmp, i) in cmpsOrder" :key="cmp" :style="{ display: 'flex' }">
                    <div>{{ cmp }}</div>
                </Draggable>
            </Container>
        </section>
        {{ group.id }}
    </section>
</template>
<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { dndService } from "../../../services/dnd.service";
export default {
    props: {
        group: {
            type: Object,
            required: true
        },
    },
    name: 'group-preview',
    data() {
        return {
            cmpsOrder: null,
        }
    },
    created() {
        this.cmpsOrder = [...this.board.cmpsOrder]
    },
    methods: {
        onDrop(dropResult) {
            this.cmpsOrder = dndService.applyDrag(this.cmpsOrder, dropResult);
            const newBoard = JSON.parse(JSON.stringify(this.board))
            newBoard.cmpsOrder = this.cmpsOrder
            this.$store.dispatch({ type: "updateBoard", board: newBoard })
        },
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
    },
    watch: {
        board: {
            handler() {
                this.cmpsOrder = [...this.board.cmpsOrder]
            },
            immediate: true,
        },
    },
    components: {
        Container,
        Draggable
    }
}
</script>
