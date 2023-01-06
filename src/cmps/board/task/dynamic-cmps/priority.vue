<template>
    <section class="priority-container">
        <span class="priority-title">{{ task.priority }}</span>
    </section>
</template>
<script>
export default {
    name: 'priority',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
}
</script>
