<template>
    <aside class="workspace-menu" :class="{ 'expanded': isOpen }">
        <div class="workspace-toggle-btn" v-tooltip="(isOpen ? 'Close' : 'Open') + ' navigation'"
            @click="isOpen = !isOpen">
            <right-arrow />
        </div>
    </aside>
</template>
<script>
import rightArrow from '../icons/right-arrow.vue'

export default {
    name: 'workspac-menu',
    data() {
        return {
            isOpen: false
        }
    },
    components: {
        rightArrow
    }
}
</script>
