import { Extension } from '@tiptap/core'
import { t } from 'i18next'
import { Document } from '@tiptap/extension-document'

import { History, HistoryOptions } from '@tiptap/extension-history'

import { Paragraph, ParagraphOptions } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { SelectionMarkerExt } from "./SelectionMarkerExt.ts";
import { Placeholder } from "@tiptap/extension-placeholder";

export interface StarterKitOptions {
  document: false,
  paragraph: Partial<ParagraphOptions> | false,
  text: false,
  selection: false,
  history: Partial<HistoryOptions> | false,
  placeholder: false,
}

 export const StarterKit = Extension.create<StarterKitOptions>({
  name: 'starterKit',

  addExtensions() {
    const extensions = []
    // 文档树
    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document))
    }
    // 段落
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph))
    }
    // 文本
    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text))
    }
    // 历史记录，撤销重做
    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history))
    }
    // 可以选中效果
    if (this.options.selection !== false) {
      extensions.push(SelectionMarkerExt.configure(this.options?.selection))
    }

    // 空行符
    if (this.options.placeholder !== false) {
      extensions.push(Placeholder.configure({
        placeholder: this.options.placeholder == '' ? '' : t(this.options.placeholder || "placeholder"),
      }))
    }

    return extensions
  },
})
