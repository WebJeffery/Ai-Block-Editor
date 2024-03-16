import {Editor} from "@tiptap/core";
import { svgIcons } from '../../icons/svg';

export const ListPlugin = {
    // toolbar 菜单
    blockToolbar: {
        "bullet-list": {
            name: "bullet-list",
            // aliases: ["ul", "list", "bulletlist", "bullet list"],
            group: "basic-group",
            icon: svgIcons.bulletList,
            desc: "bulletList-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            execute: (editor: Editor) => {
                editor.commands.toggleBulletList()
            }
        },
        "ordered-list": {
            name: "ordered-list",
            // aliases: ["li", "list", "numberedlist", "numbered list"],
            group: "basic-group",
            icon: svgIcons.orderedList,
            desc: "orderedList-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            execute: (editor: Editor) => {
                editor.commands.toggleOrderedList()
            }
        },
    }
}

