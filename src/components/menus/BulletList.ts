import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class BulletList extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div>
             ${svgIcons.bulletList}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.toggleBulletList();
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("bulletList")
    }


}


