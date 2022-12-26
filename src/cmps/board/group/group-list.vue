<template>
    <section class="groups-container" v-if="copyGroups">
        <Container @drop="onDrop">
            <Draggable v-for="(group, i) in copyGroups" :key="group.id">
                <group-preview :group="group" />
            </Draggable>

        </Container>
    </section>
</template>
<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { dndService } from "../../../services/dnd.service";
import groupPreview from './group-preview.vue'
export default {
    props: {
        groups: {
            type: Array,
            required: true
        },
        board: {
            type: Object,
            required: true
        }
    },
    name: 'group-list',
    data() {
        return {
            copyGroups: null
        }
    },
    created() {
        this.copyGroups = JSON.parse(JSON.stringify(this.groups))
    },
    methods: {
        onDrop(dropResult) {
            this.copyGroups = dndService.applyDrag(this.copyGroups, dropResult);
            this.$emit('updateGroups', this.copyGroups)
        },
    },
    components: {
        groupPreview,
        Container,
        Draggable
    },

}
</script>
