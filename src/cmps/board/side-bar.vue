<template>
    <nav class="main-navbar">
        <div v-tooltip="'Home page'">
            <router-link to="/board" exact>
                <img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="">
            </router-link>
            <div class="selected-view-indication"></div>
        </div>
        <div class="divider"></div>
        <div v-tooltip="'Work management'">
            <router-link to="/board/152lj">
                <board-button />
            </router-link>
            <div class="selected-view-indication"></div>
        </div>
        <div v-tooltip="'Notifications'">
            <bell-icon />
        </div>
        <div v-tooltip="'Favorites'">
            <favorite-icon />
        </div>
    </nav>
</template>
<script>
import boardButton from './board-button.vue';
import bellIcon from '../icons/bell.vue'
import favoriteIcon from '../icons/favorite.vue'
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
        boardButton, bellIcon, favoriteIcon
    }
}
</script>
