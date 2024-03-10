import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Quote extends AbstractMenuButton {
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
}


