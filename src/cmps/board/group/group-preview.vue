<template>
    <section class="group-preview">
        <section class="group-title">
            <pulse-menu-button />
            <div class="arrow-down">
                <arrow-down :color="group.style?.color" />
            </div>
            <h4 v-tooltip.top-center="'Click to edit'" v-if="!isTitleEdit" :style="{ color: group.style?.color }"
                @click="isTitleEdit = true">{{ group.title }}
            </h4>
            <input :style="{ color: group.style?.color }" v-click-outside="() => isTitleEdit = false"
                class="group-title-input" v-focus v-else type="text" v-model="group.title">
        </section>
        <section class="labels grid">
            <pulse-menu-button />
            <left-indicator :color="group.style?.color" :isTop="true" />
            <div class="task-checkbox">
                <label>
                    <input name="task-checkbox" type="checkbox" @change="toggleSelectAll" v-model="isSelectAll">
                    <div class="styled-checkbox" :class="{ 'checked-bg': isSelectAll }">
                        <checked-mark-icon />
                    </div>
                </label>
            </div>
            <div class="flex center" v-tooltip="'This title cannot be edited'">Task</div>
            <Container orientation="horizontal" :style="{ display: 'flex' }" @drop="onDrop">
                <Draggable v-for="(cmp, i) in cmpsOrder" :key="cmp" :style="{ display: 'flex' }">
                    <div class="column-header flex center">{{ cmp }}</div>
                </Draggable>
            </Container>
        </section>

        <Container group-name="col-items" orientation="vertical" :get-child-payload="getCardPayload(group)"
            @drop="(e) => onCardDrop(group, e)">
            <Draggable v-for="task in group.tasks" :key="task.id">
                <section class="group-grid grid" :class="{ 'selected': selectedTasks.includes(task) }"
                    :style="{ 'grid-template-columns': `30px 6px 33px 360px repeat(${cmpsOrder.length}, 140px)` }">
                    <pulse-menu-button />
                    <left-indicator :color="group.style?.color" />
                    <section class="grid-item task-checkbox">
                        <label>
                            <input :name="`checkbox-${task.id}`" type="checkbox" @change="onCheck(task)" :value="task"
                                v-model="selectedTasks">
                            <div class="styled-checkbox" :class="{ 'checked-bg': selectedTasks.includes(task) }">
                                <checked-mark-icon />
                            </div>
                        </label>
                    </section>
                    <section class="grid-item task-title-container">
                        <task-title :task="task" />
                    </section>
                    <section class="grid-item" v-for="(cmp, idx) in cmpsOrder" :key="cmp">
                        <component @updateTask="updateTask" :is="cmp" :task="task"></component>
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
import checkedMarkIcon from '../../icons/checked-mark-icon.vue';
import taskTitle from '../task/task-title.vue';

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
            isTitleEdit: false,
            selectedTasks: [],
            isSelectAll: false,
            isEditable: false
        }
    },
    created() {
        this.cmpsOrder = [...this.board.cmpsOrder]
    },
    methods: {
        updateTask(payload) {
            this.$store.dispatch({ type: "updateTask", task: payload.task })
            this.$store.commit({ type: "upadateTask", task: payload.task })
        },
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
        },
        onCheck(task) {
            if (this.isSelectAll && this.selectedTasks.length !== this.group.tasks.length) {
                this.isSelectAll = false
            }
            const selectedTask = this.selectedTasks.find(t => t.id === task.id)
            if (!selectedTask) this.$store.dispatch({ type: "removeSelectedTask", taskId: task.id })
            else this.$store.dispatch({ type: "addSelectedTask", task })
        },
        toggleSelectAll() {
            if (this.isSelectAll) {
                this.selectedTasks = this.group.tasks.map(task => task)
                this.$store.dispatch({ type: "addSelectedTasks", tasks: this.selectedTasks })
            } else {
                this.selectedTasks = []
                this.$store.dispatch({ type: 'removeSelectedTasks', tasks: this.group.tasks })
            }
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        globalSelectedTasks() {
            return this.$store.getters.selectedTasks
        },
    },
    watch: {
        board: {
            handler() {
                this.cmpsOrder = [...this.board.cmpsOrder]
            },
            immediate: true,
        },
        globalSelectedTasks: {
            handler() {
                if (!this.globalSelectedTasks.length) {
                    this.selectedTasks = []
                    this.isSelectAll = false
                }

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
        taskTitle,
        chatGrey,
        expandIcon,
        checkedMarkIcon
    }
}
</script>
