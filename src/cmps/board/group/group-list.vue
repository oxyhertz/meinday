<template>
    <section class="groups-container" v-if="copyGroups">
        <Container @drop="onDrop">
            <Draggable v-for="(group, i) in copyGroups" :key="group.id">
                <group-preview @onCardDrop="onCardDrop" :group="group" />
            </Draggable>
        </Container>
        <task-batch-actions />
    </section>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { dndService } from '../../../services/dnd.service'
import groupPreview from './group-preview.vue'
import taskBatchActions from '../task-batch-actions.vue'


export default {
    props: {
        groups: {
            type: Array,
            required: true,
        },
        board: {
            type: Object,
            required: true,
        },
    },
    name: 'group-list',
    data() {
        return {
            copyGroups: null,
        }
    },
    watch: {
        board: {
            handler() {
                this.copyGroups = JSON.parse(JSON.stringify(this.board.groups))
            },
            immediate: true,
        }
    },
    methods: {
        onDrop(dropResult) {
            this.copyGroups = dndService.applyDrag(this.copyGroups, dropResult)
            this.$emit('updateGroups', this.copyGroups)
        },
        onCardDrop(group, dropResult) {
            console.log("🚀 ~ file: group-list.vue:40 ~ onCardDrop ~ dropResult", dropResult)
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                let copyGroups = JSON.parse(JSON.stringify(this.copyGroups))
                // let copyGroups = Object.assign({}, this.copyGroups)
                // copyGroups = Object.values(copyGroups)
                const column = JSON.parse(JSON.stringify(group))
                const itemIndex = copyGroups.findIndex(group => group.id === column.id)
                const newColumn = Object.assign({}, column)
                // check if element was ADDED in current column
                if ((dropResult.removedIndex == null && dropResult.addedIndex >= 0)) {
                    // your action / api call
                    // dropResult.payload.loading = true
                    // simulate api call
                    // setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
                }

                newColumn.tasks = dndService.applyDrag(newColumn.tasks, dropResult)
                // console.log("🚀 ~ file: group-list.vue:58 ~ onCardDrop ~ newColumn.tasks", newColumn.tasks)
                copyGroups.splice(itemIndex, 1, newColumn)
                this.copyGroups = copyGroups
                // console.log("🚀 ~ file: group-list.vue:64 ~ onCardDrop ~ copyGroups", copyGroups)
                this.$emit('updateGroups', this.copyGroups)

            }
        },
    },
    components: {
        groupPreview,
        Container,
        Draggable,
        taskBatchActions
    },
}
</script>
