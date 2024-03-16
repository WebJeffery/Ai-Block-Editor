import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Quote extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.quote}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleBlockquote();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("blockquote")
    }

    onDisable(editor: Editor) {
        return !this.editor?.can().setBlockquote?.()
    }
}


