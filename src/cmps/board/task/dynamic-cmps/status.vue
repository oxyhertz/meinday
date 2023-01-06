<template>
    <section class="status-container">
        <span class="status-title">{{ task.status }}</span>
    </section>
</template>
<script>
export default {
    name: 'status',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
}
</script>
