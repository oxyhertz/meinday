<template>
    <section class="group-preview">
        <section class="group-title">
            <arrow-down :color="group.style?.color" />
            <h4 :style="{ color: group.style?.color }">{{ group.title }}</h4>
        </section>
        <section class="lables" :style="{ display: 'flex' }">
            <div>Task</div>
            <Container orientation="horizontal" :style="{ display: 'flex' }" @drop="onDrop">
                <Draggable v-for="(cmp, i) in cmpsOrder" :key="cmp" :style="{ display: 'flex' }">
                    <div>{{ cmp }}</div>
                </Draggable>
            </Container>
        </section>

        <Container group-name="col-items" orientation="vertical" :get-child-payload="getCardPayload(group)"
            @drop="(e) => onCardDrop(group, e)">
            <Draggable v-for="task in group.tasks" :key="task.id">
                <section class="group grid">
                    <section class="grid-item" v-for="(cmp, idx) in cmpsOrder" :key="cmp">
                        <component :is="cmp" :task="task"></component>
                    </section>
                </section>
            </Draggable>
        </Container>
        {{ group.id }}
    </section>
</template>
<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { dndService } from "../../../services/dnd.service";
import status from '../task/dynamic-cmps/status.vue'
import date from '../task/dynamic-cmps/date.vue';
import members from '../task/dynamic-cmps/members.vue';
import priority from '../task/dynamic-cmps/priority.vue';
import arrowDown from '../../icons/arrow-down.vue';
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
        onCardDrop(groupId, dropResult) {
            this.$emit('onCardDrop', groupId, dropResult)
        },
        getCardPayload() {
            return index => {
                return this.group.tasks[index]
            }
        }
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
        Draggable,
        date,
        members,
        status,
        priority,
        arrowDown
    }
}
</script>
