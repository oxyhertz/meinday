<template>
    <section class="members-preview-container" @click="isOpen = !isOpen">
        <i class="fa-solid fa-circle-plus"></i>
        <img v-if="!task.members.length" src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="user image"
            width="26" height="26">
        <section class="members-icons" v-if="task.members.length > 0 && task.members.length < 3">
            <div class="member-preview" v-for="member in task.members" :key="member._id">
                <img :src="member.imgUrl" alt="" width="30" height="30">
            </div>
        </section>
        <section class="members-icons" v-if="task.members.length > 2">
            <div class="member-preview">
                <img :src="task.members[0].imgUrl" alt="" width="30" height="30">
            </div>
            <div class="members-count">
                <span>+{{ task.members.length }}</span>
            </div>
        </section>
        <VDropdown :distance="17" :triggers="[]" :shown="isOpen">
            <template #popper>
                <members-popover @addUser="addUser" @removeMember="removeMember" :task="task" />
            </template>
        </VDropdown>
    </section>
</template>
<script>
import subPopper from '../../../popups/sub-popper.vue';
import membersPopover from './members-popover.vue'
export default {
    name: 'members-preview',
    props: {
        task: {
            type: Object,
            required: true

        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        removeMember(member) {
            const taskCopy = JSON.parse(JSON.stringify(this.task))
            // remove member from task
            const memberIdx = taskCopy.members.findIndex(currMember => currMember._id === member._id)
            taskCopy.members.splice(memberIdx, 1)
            this.$emit('updateTask', {
                task: taskCopy, activity: {
                    type: 'removed-member',
                    payload: member,
                    taskId: this.task._id
                }
            })

        },
        addUser(member) {
            const taskCopy = JSON.parse(JSON.stringify(this.task))
            // add member to task
            taskCopy.members.push(member)
            this.$emit('updateTask', {
                task: taskCopy, activity: {
                    type: 'added-member',
                    payload: member,
                    taskId: this.task._id
                }
            })
        }
    },
    created() {
    },
    components: {
        subPopper,
        membersPopover
    }
}
</script>
