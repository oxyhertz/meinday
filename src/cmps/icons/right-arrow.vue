<template lang="">
    <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12"  aria-hidden="false"><path d="M5.46967 10.5303L6 10L5.46967 9.46967C5.17678 9.76256 5.17678 10.2374 5.46967 10.5303ZM7.06066 10L13.5303 3.53033C13.8232 3.23744 13.8232 2.76256 13.5303 2.46967C13.2374 2.17678 12.7626 2.17678 12.4697 2.46967L5.46967 9.46967L6 10L5.46967 10.5303L12.4697 17.5303C12.7626 17.8232 13.2374 17.8232 13.5303 17.5303C13.8232 17.2374 13.8232 16.7626 13.5303 16.4697L7.06066 10Z" fill="currentColor" fill-rule="evenodd" ></path></svg>
</template>
<script>
export default {
    name: 'right-arrow'
}
</script>
<style scoped lang="scss">
svg {
    transform: rotate(-180deg);
    transition: transform 1s ease-in-out;
}
</style>