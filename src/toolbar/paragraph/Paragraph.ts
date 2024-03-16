import {Editor} from "@tiptap/core";
import { svgIcons } from '../../icons/svg';

export const ParagraphPlugin = {
    // toolbar 菜单
    blockToolbar: {
        paragraph: {
            name: "paragraph",
            // aliases: ["p"],
            group: "basic-group",
            icon: svgIcons.paragraph,
            desc: "paragraph-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            execute: (editor: Editor) => {
                editor.chain().setParagraph().run();
            }
        },
    }
}

