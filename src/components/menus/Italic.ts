import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Italic extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.italic}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleItalic();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("italic")
    }

}


