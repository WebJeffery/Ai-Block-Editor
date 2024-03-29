import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class OrderedList extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.orderedList}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleOrderedList();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("orderedList")
    }



}


