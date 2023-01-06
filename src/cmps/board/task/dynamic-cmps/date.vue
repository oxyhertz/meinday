<template>
    <section class="date-preview-container">
        <span class="date-title">{{ task.dueDate }}</span>
    </section>
</template>
<script>
export default {
    name: 'date',
    props: {
        task: {
            type: Object,
            required: true
        }
    }
}
</script>
