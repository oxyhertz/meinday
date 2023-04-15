<template>
    <section class="">
        <DynamicModal>
            <template #popper>
                <h1>Dynamic Modal</h1>
            </template>
        </DynamicModal>
        <h1>Boards Home</h1>
        <QuillEditor theme="snow" v-model:content="content" contentType="html" @editorChange="onChange" />
        <div v-html="content"></div>
    </section>
</template>
<script>
import DynamicModal from '../dynamic-modal.vue';

export default {
    name: '',
    data() {
        return {
            content: ''
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        onChange(info) {
            console.log(this.content)
            console.log('info:', info);
        }

    },
    computed: {

    },
    components: {
        DynamicModal
    }
}
</script>
