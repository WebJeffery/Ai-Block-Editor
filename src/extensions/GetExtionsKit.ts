import { Extension } from '@tiptap/core'
import { AiEditor } from '../index.ts'
import { PainterExt } from "../extensions/PainterExt.ts"
import { Bold, BoldOptions } from '@tiptap/extension-bold'
import { Italic, ItalicOptions } from '@tiptap/extension-italic'
import Underline from "@tiptap/extension-underline"
import { Strike, StrikeOptions } from '@tiptap/extension-strike'
import TextStyle from "@tiptap/extension-text-style";
import { Link } from "@tiptap/extension-link";
import { Code, CodeOptions } from '@tiptap/extension-code'
import { TextAlign, TextAlignOptions} from "@tiptap/extension-text-align";
import { IndentExt } from "../extensions/IndentExt.ts";
import { LineHeightExt } from "../extensions/LineHeightExt.ts";
import CharacterCount from "@tiptap/extension-character-count";
import { Blockquote, BlockquoteOptions } from '@tiptap/extension-blockquote'
import { CodeBlock, CodeBlockOptions } from '@tiptap/extension-code-block'
// import { Highlight, HighlightOptions } from '@tiptap/extension-highlight'
import { Dropcursor, DropcursorOptions } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { Heading, HeadingOptions } from '@tiptap/extension-heading'
import { BulletList, BulletListOptions } from '@tiptap/extension-bullet-list'
import { OrderedList, OrderedListOptions } from '@tiptap/extension-ordered-list'
import { ListItem, ListItemOptions } from '@tiptap/extension-list-item'
import { HardBreak, HardBreakOptions } from '@tiptap/extension-hard-break'
import { HorizontalRule, HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import { SlashMenuSuggestion } from "../extensions/SlashSuggestion.ts";

// 暂时不开放
// import {FontFamily} from "@tiptap/extension-font-family";
// import {Color} from "@tiptap/extension-color";
// import {FontSizeExt} from "../extensions/FontSizeExt.ts";
// import {ImageExt} from "./ImageExt.ts";
// import {Table} from "@tiptap/extension-table";
// import {TableRow} from "@tiptap/extension-table-row";
// import {TableHeader} from "@tiptap/extension-table-header";
// import {TableCell} from "@tiptap/extension-table-cell";
// import {Superscript} from "@tiptap/extension-superscript";
// import {Subscript} from "@tiptap/extension-subscript";
// import {TaskList} from "@tiptap/extension-task-list";
// import {TaskItem} from "@tiptap/extension-task-item";
import {CodeBlockExt} from "./CodeBlockExt.ts";
import {common, createLowlight} from "lowlight";
// import {VideoExt} from "../extensions/VideoExt.ts";
// import {IFrameExt} from "../extensions/IFrameExt.ts";
// import {createMention} from "../extensions/MentionExt.ts";
// import {ContainerExt} from "../extensions/ContainerExt.ts";
// import {SaveExt} from "../extensions/SaveExt.ts";
import {Markdown} from "tiptap-markdown";
import { PasteExt } from './PasteExt.ts'
import {
  createLinkBubbleMenu,
  // createImageBubbleMenu,
  createTextSelectionBubbleMenu
} from "../core/getBubbleMenus.ts";

export interface ExtensionKitOptions {
  painter: false,
  underline: false,
  textStyle: false,
  link: false,
  textAlign: Partial<TextAlignOptions> | false,
  indent: false,
  lineHeight: false,
  charCount: false,
  blockquote: Partial<BlockquoteOptions> | false,
  bold: Partial<BoldOptions> | false,
  bulletList: Partial<BulletListOptions> | false,
  code: Partial<CodeOptions> | false,
  codeBlock: Partial<CodeBlockOptions> | false,
  dropcursor: Partial<DropcursorOptions> | false,
  gapcursor: false,
  slash: false,
  selectionBubble: false,
  paste: false,
  markdown: false,
  hardBreak: Partial<HardBreakOptions> | false,
  heading: Partial<HeadingOptions> | false,
  horizontalRule: Partial<HorizontalRuleOptions> | false,
  italic: Partial<ItalicOptions> | false,
  listItem: Partial<ListItemOptions> | false,
  orderedList: Partial<OrderedListOptions> | false,
  strike: Partial<StrikeOptions> | false,
  text: false,
}

//  export const GetExtionsKit = Extension.create<ExtensionKitOptions>({
 export const GetExtionsKit = (editor: AiEditor, options: ExtensionKitOptions) => {
    const extensions = []

    // 格式刷
    if (options.painter !== false) {
      extensions.push(PainterExt.configure(options.painter))
    }
    // 加粗
    if (options.bold !== false) {
      extensions.push(Bold.configure(options?.bold))
    }
    // 斜体
    if (options.italic !== false) {
      extensions.push(Italic.configure(options?.italic))
    }
    // 下划线
    if (options.underline !== false) {
      extensions.push(Underline.configure(options?.underline))
    }
    // 删除线
    if (options.strike !== false) {
      extensions.push(Strike.configure(options?.strike))
    }
    // 样式、字体颜色、背景设置
    if (options.textStyle !== false) {
      extensions.push(TextStyle.configure(options?.textStyle))
    }
    // 链接
    if (options.link !== false) {
      const linkOptions = (options.link || {}) as any
      extensions.push(Link.configure({
        openOnClick: false,
        autolink: typeof linkOptions?.autolink === "undefined" ? true : linkOptions?.autolink,
        HTMLAttributes: {
            ref: linkOptions?.rel,
            class: linkOptions?.class,
        }
      }), createLinkBubbleMenu(editor)) // 链接悬浮
    }
    // 行内代码
    if (options.code !== false) {
      extensions.push(Code.configure({
        HTMLAttributes: {
          class: 'aie-inline-code',
        }
      }))
    }
    // 对齐
    if (options.textAlign !== false) {
      extensions.push(TextAlign.configure({
        types: options.textAlign?.types || ['heading', 'paragraph'],
      }))
    }
    // 缩进
    if (options.indent !== false) {
      extensions.push(IndentExt.configure(options?.indent))
    }
    // 行高
    if (options.lineHeight !== false) {
      extensions.push(LineHeightExt.configure(options?.lineHeight))
    }

    // 计数文字
    if (options.charCount !== false) {
      extensions.push(CharacterCount.configure(options.charCount))
    }
    // 引用
    if (options.blockquote !== false) {
      extensions.push(Blockquote.configure(options.blockquote))
    }
    // 代码块
    if (options.codeBlock !== false) {
      extensions.push(
        CodeBlock.configure(options?.codeBlock),
        // Highlight.configure({
        //   multicolor: true
        // }),
        CodeBlockExt.configure({
          lowlight: createLowlight(common),
          defaultLanguage: 'auto',
          languageClassPrefix: 'language-',
          codeExplainAi: {
              model: "spark",
              prompt: "帮我对这个代码进行解释，返回代码的解释内容，注意，不需要对代码的注释进行解释",
          },
          codeCommentsAi: {
              model: "spark",
              prompt: "帮我对这个代码添加一些注释，并返回添加注释的代码，只返回代码",
          },
        }),
      )
    }

    if (options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(options?.dropcursor))
    }

    if (options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(options?.gapcursor))
    }
    // 标题
    if (options.heading !== false) {
      extensions.push(Heading.configure(options?.heading))
    }
    // 无序列表
    if (options.bulletList !== false) {
      extensions.push(BulletList.configure(options?.bulletList))
    }

    if (options.listItem !== false) {
      extensions.push(ListItem.configure(options?.listItem))
    }
    // 有序列表
    if (options.orderedList !== false) {
      extensions.push(OrderedList.configure(options?.orderedList))
    }
    // 增加了对<br> HTML标签的支持，该标签强制换行
    if (options.hardBreak !== false) {
      extensions.push(HardBreak.configure(options?.hardBreak))
    }
    // 设置水平分隔符
    if (options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(options?.horizontalRule))
    }
    // 斜杠插件
    if (options.slash !== false) {
      extensions.push(SlashMenuSuggestion.configure(options?.slash))
    }

    // AttachmentExt.configure({
    //         //     uploadUrl: options.attachment?.uploadUrl,
    //         //     uploadHeaders: options.attachment?.uploadHeaders,
    //         //     uploader: options.attachment?.uploader || options.uploader,
    //         //     uploaderEvent: options.attachment?.uploaderEvent,
    //         // }),
        //         // Color, FontSizeExt, 
    //         // Table.configure({
    //         //     resizable: true,
    //         //     lastColumnResizable: true,
    //         //     allowTableNodeSelection: true,
    //         // }),
    //         // TableRow,
    //         // TableHeader,
    //         // TableCell,
    


        //         // Superscript,
    //         // Subscript,
    //         // TaskList,
    //         // TaskItem.configure({
    //         //     nested: true,
    //         // }),
    //         // VideoExt.configure({
    //         //     uploadUrl: options.video?.uploadUrl,
    //         //     uploadHeaders: options.video?.uploadHeaders,
    //         //     uploader: options.video?.uploader || options.uploader,
    //         //     uploaderEvent: options.video?.uploaderEvent,
    //         // }),
    //         // IFrameExt,
    //         // SaveExt.configure({
    //         //     onSave: options.onSave,
    //         // }),
        //        
    //         // ContainerExt,
    //     )
    // }
        // 图片插件
    // if (options.image && !options.image.disable) {
    //     ret.push(
    //         ImageExt.configure({
    //         allowBase64: typeof options.image?.allowBase64 === "undefined" ? true : options.image?.allowBase64,
    //         defaultSize: options.image?.defaultSize || 350,
    //         uploadUrl: options.image?.uploadUrl,
    //         uploadHeaders: options.image?.uploadHeaders,
    //         uploader: options.image?.uploader || options.uploader,
    //         uploaderEvent: options.image?.uploaderEvent,
    //     }),
    //     // 图片操作浮窗
    //     createImageBubbleMenu(editor)
    //     )
    // }

    // 选中悬浮行内工具栏
    if (options.selectionBubble) {
      extensions.push(createTextSelectionBubbleMenu(editor))
    }
    // 粘贴
    if (options.paste) {
      extensions.push(PasteExt.configure(options.paste))
    }

    // markdown 语法
    if (options.markdown) {
      extensions.push(
        Markdown.configure({
          html: true,                  // Allow HTML input/output
          tightLists: true,            // No <p> inside <li> in markdown output
          tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
          bulletListMarker: '-',       // <li> prefix in markdown output
          linkify: true,              // Create links from "https://..." text
          breaks: true,               // New lines (\n) in markdown input are converted to <br>
          transformPastedText: true,  // Allow to paste markdown text in the editor
          transformCopiedText: false,  // Copied text is transformed to markdown
      })
      )
    }

    // 

    // if (options.cbName && options.cbUrl) {
    //     const provider = new HocuspocusProvider({
    //         url: options.cbUrl,
    //         name: options.cbName,
    //     })
    //     ret.push(Collaboration.configure({
    //         document: provider.document,
    //     }))
    // }

    // if (options.onMentionQuery) {
    //     ret.push(createMention(options.onMentionQuery))
    // }

    return extensions
  }
