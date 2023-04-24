<template>
    <VDropdown theme="sub-popper">
        <slot name="button">
            <button>Click me</button>
        </slot>
        <template #popper>
            <slot>
                <section class="popper-content">
                    <p>popper</p>
                </section>
            </slot>
        </template>
    </VDropdown>
</template>
<script>
export default {
    name: 'sub-popup'
}
</script>
<style lang="scss">
.v-popper--theme-sub-popper {
    .v-popper__arrow-container {
        display: none;
    }

    .v-popper__inner {
        background-color: #fff;
        border-radius: 8px;
        width: 264px;
        box-shadow: 0 4px 17px 6px rgba(0, 0, 0, .1);
        color: #323338;
        border: none;
        min-height: 140px;
        color: #323338;
        font-size: 14px;
        font-weight: 400;
        font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP,
            sans-serif;
        ;
    }
}
</style>