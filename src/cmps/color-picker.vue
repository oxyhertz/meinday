<template>
    <section class="color-picker">
        <div v-tooltip="color.title" class="color-box-container" v-for="color in colors" :key="color.title"
            @click="onSelectColor(color.color)">
            <div class="feedback-indicator"></div>
            <div class="color-box" :style="{ 'background-color': color.color }">
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'color-picker',
    props: {
        colors: {
            type: Array,
            default: () => [{ title: 'Bright Green', color: '#9cd326' },
            { title: 'Electric Blue', color: '#7df9ff' },
            { title: 'Sunshine Yellow', color: '#ffe82d' },
            { title: 'Deep Purple', color: '#660066' },
            { title: 'Hot Pink', color: '#ff69b4' },
            { title: 'Ocean Blue', color: '#006699' }, { title: 'Crimson Red', color: '#dc143c' },
            { title: 'Magenta', color: '#ff00ff' },
            {
                title: 'Turquoise',
                color: '#40e0d0'
            },
            {
                title: 'Bright Orange',
                color: '#ff6600'
            },
            {
                title: 'Goldenrod',
                color: '#daa520'
            },
            {
                title: 'Lime Green',
                color: '#00ff00'
            },
            {
                title: 'Slate Gray',
                color: '#708090'
            },
            {
                title: 'Pale Pink',
                color: '#ffc0cb'
            },
            {
                title: 'Teal',
                color: '#008080'
            },
            {
                title: 'Silver',
                color: '#c0c0c0'
            },
            {
                title: 'Forest Green',
                color: '#228b22'
            },
            {
                title: 'Midnight Blue',
                color: '#191970'
            },
            {
                title: 'Deep Sky Blue',
                color: '#00bfff'
            },
            {
                title: 'Indigo',
                color: '#4b0082'
            },
            {
                title: 'Salmon',
                color: '#fa8072'
            },
            {
                title: 'Olive',
                color: '#808000'
            },
            {
                title: 'Aqua',
                color: '#00ffff'
            },
            {
                title: 'Dark Red',
                color: '#8b0000'
            },
            {
                title: 'Dark Green',
                color: '#006400'
            },
            {
                title: 'Royal Blue',
                color: '#4169e1'
            },
            {
                title: 'Chocolate Brown',
                color: '#d2691e'
            },
            {
                title: 'Pale Yellow',
                color: '#ffff99'
            },
            {
                title: 'Plum Purple',
                color: '#8e4585'
            },
            {
                title: 'Sandy Brown',
                color: '#f4a460'
            },
            {
                title: 'Steel Blue',
                color: '#4682b4'
            },
            {
                title: 'Khaki',
                color: '#f0e68c'
            },
            {
                title: 'Maroon',
                color: '#800000'
            },
            {
                title: 'Deep Pink',
                color: '#ff1493'
            },
            {
                title: 'Cyan',
                color: '#00ffff'
            }]

        }
    },
    methods: {
        onSelectColor(color) {
            this.$emit('selectedColor', color);
        }
    },

}
</script>
<style lang="scss" >
.color-picker {
    width: 152px;
    padding: 12px;
    display: flex;
    flex-wrap: wrap;

    .color-box-container {
        margin: 4px;
        display: flex;
        list-style-type: none;
        position: relative;
        border-radius: 4px;

        &:hover {
            border-radius: 4px;

            .feedback-indicator {
                content: " ";
                position: absolute;
                border-radius: 4px;
                inset: -4px;
                border: 4px solid;
                background-color: #dcdfec;
                border-color: #dcdfec;
                pointer-events: none;
            }
        }

        .feedback-indicator {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-color: transparent;

        }

        .color-box {
            width: 24px;
            border-radius: 4px;
            height: 24px;
            z-index: 5;
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0);
        }
    }
}
</style>