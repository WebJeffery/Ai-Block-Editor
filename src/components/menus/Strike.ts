import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Strike extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.strike}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleStrike();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("strike")
    }
}


