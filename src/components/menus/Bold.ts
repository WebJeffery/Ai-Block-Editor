import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Bold extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.bold}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleBold();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("bold")
    }

}


