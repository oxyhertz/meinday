<template>
    <div class="left-indicator" :class="{ 'top-left-radius': isTop }"
        :style="{ 'border-color': color, 'background-color': color || 'yellow' }">

    </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
        },
        isTop: {
            type: Boolean,
            default: false
        }
    },
    name: 'left-indicator'
}
</script>

<style lang="scss" scoped>
.left-indicator {
    width: 6px;
}

.top-left-radius {
    border-top-left-radius: 6px;
}
</style>
