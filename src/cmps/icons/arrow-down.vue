<template lang="">
   <svg v-tooltip="'Collapse group'" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" :fill="color"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: "#f0f0f0"
        }
    },
    name: "arrow-down"
}
</script>
<style  lang="scss">

</style>