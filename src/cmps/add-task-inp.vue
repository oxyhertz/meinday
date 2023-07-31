<template>
    <input placeholder="+ Add task" @blur="$emit('on-add-task')" type="text"
        v-click-outside="() => $emit('on-input-focus', false)" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" @click="$emit('on-input-focus', true)">
</template>
<script>
export default {
    name: 'add-task-input',
    emits: ['on-input-focus', 'update:modelValue', 'on-add-task'],
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isEditable: false
        }
    },
}
</script>
