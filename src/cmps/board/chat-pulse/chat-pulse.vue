<template>
    <section class="chat-pulse-container">
        <h1>Chat pulse</h1>
        <QuillEditor theme="snow" v-model:content="content" contentType="html" @editorChange="onChange" />
        <div v-html="content"></div>
    </section>
</template>
<script>
export default {
    name: 'chat-pulse',
    data() {
        return {
            content: ''
        }
    },
    methods: {
        onChange(info) {
            console.log(this.content)
            console.log('info:', info);
        }

    },
}
</script>
