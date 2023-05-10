<template>
    <section class="label-picker">
        <div v-if="!isEditLabel">
            <div class="label" :class="{ 'selected-label': task.status === label.title }" @click="selectLabel(label)"
                v-for="label in coppyLabels" :key="label.id" :style="{ 'background-color': label.color }">
                {{ label.title }}
            </div>
        </div>
        <div v-else>
            <div class="label-edit" v-for="label in coppyLabels" :key="label.id">
                <VDropdown :skidding="65" theme="color-picker">
                    <span :style="{ 'background-color': label.color }" @click="colorPickerActiveLabel = label.id">
                        <color-pour />
                    </span>
                    <template #popper>
                        <color-picker @selected-color="(c) => onColorSelect(c, label)" />
                    </template>
                </VDropdown>
                <input placeholder="Add Label" type="text" @change="$emit('updateLabels', coppyLabels, label)"
                    v-model="label.title" />
                <delete-icon class="delete-icon" :class="{ 'unactive-label': !isActiveLabel(label) }"
                    v-tooltip="isActiveLabel(label) ? `You can't delete a label while in use` : 'Delete label'"
                    @click="deleteLabel(label)" />
            </div>
            <button class="new-label" @click="$emit('add-new-label')">+ New label</button>
        </div>
        <divider />
        <button @click="isEditLabel = !isEditLabel">
            <edit-icon />
            <span>{{ btnText }}</span>
        </button>
    </section>
</template>
<script>
import divider from '../../../divider.vue';
import colorPour from '../../../icons/color-pour.vue';
import editIcon from '../../../icons/edit-icon.vue';
import deleteIcon from '../../../icons/delete-icon.vue';
import colorPicker from '../../../color-picker.vue';
export default {
    name: 'label-picker',
    props: {
        labels: {
            type: Array,
            default: () => [],
        },
        task: {
            type: Object,
        },
        activeLabels: {
            type: Array
        }
        // 'Working on it', 'Stuck', 'Done'
    },
    data() {
        return {
            isEditLabel: false,
            colorPickerActiveLabel: false,
            coppyLabels: []
        }
    },
    created() {
        console.log('activeLabels', this.activeLabels)
    },
    watch: {
        labels: {
            immediate: true,
            handler() {
                this.coppyLabels = JSON.parse(JSON.stringify(this.labels))
            }
        }
    },
    methods: {
        selectLabel(label) {
            this.$emit('selectLabel', label)
        },
        onColorSelect(color, label) {
            this.$emit('selectColor', color, label)
        },
        deleteLabel(label) {
            if (this.isActiveLabel(label)) return
            this.$emit('delete-label', label)
        },
        isActiveLabel(label) {
            return this.activeLabels.find(l => l.id === label.id)
        }

    },
    computed: {
        btnText() {
            return this.isEditLabel ? 'Apply' : 'Edit label'
        },
    },
    components: {
        divider,
        editIcon,
        colorPour, colorPicker,
        deleteIcon

    },
}
</script>

<style lang="scss">
.v-popper--theme-color-picker.v-popper__popper--shown {
    .v-popper__arrow-container {
        display: none;
    }

    .v-popper__inner {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 17px 6px rgba(0, 0, 0, .1);
        width: 166px;
    }
}

.label-picker {
    padding: 16px 24px 8px;
    font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP;

    .selected-label {}

    .label-edit {
        display: flex;
        border-radius: 4px;
        border: 1px solid;
        border-color: #E6E9EF;
        align-items: center;
        padding: 4px;
        // overflow: hidden;
        margin-block-end: 8px;
        position: relative;

        .delete-icon {
            position: absolute;
            right: -21px;
            opacity: 0;
            transition: opacity 100ms ease-in-out;

        }

        &:hover {
            svg {
                opacity: 0.7;

                &.unactive-label:hover {
                    cursor: pointer;
                    background-color: #dcdfec;
                    opacity: 1;
                    border-radius: 4px;

                }
            }
        }

        span {
            height: 24px;
            width: 24px;
            border-radius: 4px;
            border-width: 1px;
            border-style: solid;
            border-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
                opacity: 0.85;
            }
        }

        input {
            width: 128px;
            height: 100%;
            background-color: white;
            color: #323338;
            outline: none;
            margin-left: 4px;
            padding-right: 4px;
            border: none;
            border-radius: 0 2px 2px 0;
            border-width: 1px 1px 1px 0;
            border-style: solid;
            border-color: transparent;
            min-width: 0;
            font-family: inherit;
            font-size: 14px;
        }

        &:focus-within {
            border-color: #0073ea;
        }
    }


    button {
        text-transform: capitalize;
        font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP;
        color: #323338;
        background-color: rgba(0, 0, 0, 0);
        padding: 4px 8px;
        height: 32px;
        line-height: 24px;
        width: 100%;
        outline: none;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        transition: background-color 0.1s ease-in-out;
        font-size: 14px;

        &:hover {
            background: #c5c7d0;
        }

        svg {
            margin-inline-end: 8px;
        }
    }

    .new-label {
        border: 1px solid #e6e9ef;
        margin-block-end: 8px;
    }

    .label {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-block-end: 8px;
        text-align: center;
        border-radius: 2px;
        padding: 0 4px;
        width: 152px;
        color: #fff;
        font-weight: 400;
        cursor: pointer;
        transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
        position: relative;

        &:hover {
            opacity: 0.85;
        }
    }
}
</style>
