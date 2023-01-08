<template>
    <div class="pulse-menu-btn">
        <i class="fa-solid fa-ellipsis"></i>
    </div>
</template>
<script>
export default {
    name: 'pulse-menu-button'
}
</script>

<style lang="scss" scoped>
.pulse-menu-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    opacity: 0;
    width: 21px;
    height: 21px;
    padding: 1px 1px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #d0d4e4;
    }
}
</style>
