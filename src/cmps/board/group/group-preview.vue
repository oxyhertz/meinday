<template>
    <section class="group-preview">
        <section class="group-title">
            <pulse-menu-button />
            <div class="arrow-down">

                <arrow-down :color="group.style?.color" />
            </div>
            <h4 :style="{ color: group.style?.color }">{{ group.title }}</h4>
        </section>
        <section class="labels grid">
            <pulse-menu-button />
            <left-indicator :color="group.style?.color" :isTop="true" />
            <div>
                <label for="">

                </label>
            </div>
            <div>Task</div>
            <Container orientation="horizontal" :style="{ display: 'flex' }" @drop="onDrop">
                <Draggable v-for="(cmp, i) in cmpsOrder" :key="cmp" :style="{ display: 'flex' }">
                    <div class="column-header">{{ cmp }}</div>
                </Draggable>
            </Container>
        </section>

        <Container group-name="col-items" orientation="vertical" :get-child-payload="getCardPayload(group)"
            @drop="(e) => onCardDrop(group, e)">
            <Draggable v-for="task in group.tasks" :key="task.id">
                <section class="group-grid grid"
                    :style="{ 'grid-template-columns': `30px 6px 38px 360px repeat(${cmpsOrder.length}, 140px)` }">
                    <pulse-menu-button />
                    <left-indicator :color="group.style?.color" />

                    <section class="grid-item">
                        <input type="checkbox">
                    </section>
                    <section class="grid-item task-title-container">
                        <div class="task-name">
                            <p>{{ task.title }}</p>
                            <div class="expand-task" v-tooltip="'Open item page'">
                                <expand-icon />
                                <span>Open</span>
                            </div>
                        </div>
                        <div class="open-chat">
                            <chat-grey />
                        </div>
                    </section>
                    <section class="grid-item" v-for="(cmp, idx) in cmpsOrder" :key="cmp">
                        <component :is="cmp" :task="task"></component>
                    </section>
                </section>
            </Draggable>
        </Container>
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
import pulseMenuButton from '../../pulse-menu-button.vue';
import leftIndicator from '../task/left-indicator.vue';
import chatGrey from '../../icons/chat-grey.vue';
import expandIcon from '../../icons/expand-icon.vue'
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
        pulseMenuButton,
        arrowDown,
        leftIndicator,
        chatGrey,
        expandIcon
    }
}
</script>
