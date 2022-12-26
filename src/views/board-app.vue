<template>
    <section class="board-main" :style="{ 'display': 'flex' }">
        <side-bar />
        <router-view />
    </section>
</template>
<script>
import sideBar from '../cmps/board/side-bar.vue';
export default {
    name: 'board app',
    components: {
        sideBar
    }
}
</script>
