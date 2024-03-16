import {Editor} from "@tiptap/core";
import { svgIcons } from '../../icons/svg';

export const QuotePlugin = {
    // toolbar 菜单
    blockToolbar: {
        quote: {
            name: "quote",
            group: "basic-group",
            icon: svgIcons.quote,
            desc: "quote-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            execute: (editor: Editor) => {
                editor.commands.toggleBlockquote();
            }
        },
    }
}

