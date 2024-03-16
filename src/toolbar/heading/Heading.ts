import {Editor} from "@tiptap/core";
import { svgIcons } from '../../icons/svg';

export const HeadingPlugin = {
    // slash 菜单
    blockToolbar: {
        h1: {
            name: "h1",
            // aliases: ["h", "heading1", "h1"],
            group: "heading-group",
            icon: svgIcons.h1,
            desc: "h1-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 1}).run();
            }
        },
        h2: {
            name: "h2",
            // aliases: ["h2", "heading2", "subheading"],
            group: "heading-group",
            icon: svgIcons.h2,
            desc: "h2-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-2"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 2}).run();
            }
        },
        h3: {
            name: "h3",
            // aliases: ["h3", "heading3", "subheading"],
            group: "heading-group",
            icon: svgIcons.h3,
            desc: "h3-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-3"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 3}).run();
            }
        },
        h4: {
            name: "h4",
            // aliases: ["h4", "heading4", "subheading"],
            group: "heading-group",
            icon: svgIcons.h4,
            desc: "h4-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-4"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 4}).run();
            }
        },
        h5: {
            name: "h5",
            // aliases: ["h5", "heading5", "subheading"],
            group: "heading-group",
            icon: svgIcons.h5,
            desc: "h5-desc",
          //   shortcut: formatKeyboardShortcut("Mod-Alt-5"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 5}).run();
            }
        },
        h6: {
            name: "h6",
            // aliases: ["h6", "heading6", "subheading"],
            group: "heading-group",
            icon: svgIcons.h6,
            desc: "h6-desc",
            //   shortcut: formatKeyboardShortcut("Mod-Alt-6"),
            execute: (editor: Editor) => {
                editor!.chain().setHeading({level: 6}).run();
            }
        },
    }
  };
