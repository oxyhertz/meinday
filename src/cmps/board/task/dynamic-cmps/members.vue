<template>
    <section class="members-preview-container">
        <div class="member-preview" v-for="member in task.memberIds" :key="member">
            <!-- <img :src="member.imgUrl" alt=""> -->
            <span>{{ member }}</span>
        </div>
    </section>
</template>
<script>
export default {
    name: 'members-preview',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    created() {
    }
}
</script>
