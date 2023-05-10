<template>
    <status :task="task" cmpType="priority" />
</template>
<script>
import status from './status.vue';
export default {
    name: 'priority',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    components: {
        status
    },
    methods: {


    },
}
</script>
 