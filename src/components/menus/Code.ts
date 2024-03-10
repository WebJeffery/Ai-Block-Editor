import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Code extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.inlineCode}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleCode();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("code")
    }

}


