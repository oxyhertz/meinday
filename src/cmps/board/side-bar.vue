<template>
    <nav class="main-navbar">
        <div>
            <router-link to="/board" exact>
                <img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="">
            </router-link>
            <div class="selected-view-indication"></div>
        </div>
        <div class="divider"></div>
        <div>
            <router-link to="/board/152lj">
                <board-button />
            </router-link>
            <div class="selected-view-indication"></div>
        </div>
    </nav>
</template>
<script>
import boardButton from './board-button.vue';
export default {
    name: 'side-bar',
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
    components: {
        boardButton
    }
}
</script>
