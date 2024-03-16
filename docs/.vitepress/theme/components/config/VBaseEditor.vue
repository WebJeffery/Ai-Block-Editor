<!--
 * @Description: Ai富文本编辑器 - TipTap
-->
<template>
    <div class="editor-box">
      <!-- 编辑器占位符 -->
      <div
          id="aiEditor"
          ref="editorRef"
          class="editor-content"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
//@ts-ignore
// import { AiEditor } from './editor-ai'
import { AiEditor } from 'ai-block-editor'

const editorRef = ref('')
const editor = ref<any>(null)



const initEditor = () => {
    editor.value = new AiEditor({
        element: '#aiEditor',
        // 是否开启本地缓存
        contentRetention: true,
        // 工具栏配置，跟产品沟通开放的功能
        // toolbarKeys: [
        //     'undo', 'redo', 'brush', 'eraser', 'divider', 'heading', 'bold', 'italic', 'underline'
        //     , 'strike', 'link', 'code', 'divider', 'align', 'line-height', 'divider', 'bullet-list', 'ordered-list', 'quote',
        //     'indent-decrease', 'indent-increase', 'fullscreen'
        // ],
        // editable:false,
        // content: props.editorConfig.initContent,
        // i18n: {

        // }
    })
}

onMounted(() => {
    initEditor()
})

onBeforeUnmount(() => {
    editor.value?.destroy()
    editor.value = null
})

</script>

<style lang="scss">
@import 'ai-block-editor/dist/style.css';
</style>

<style scoped lang="scss">
.editor-box {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    border: 1px solid #ccc;

    .editor-content {
        flex: 1;
        overflow-y: auto;
    }
    @media (max-width: 768px) {
        .send-tips {
            display: none;
        }
    }
}
</style>