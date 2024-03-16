import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Redo extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
         <div style="height: 16px" >
            ${svgIcons.redo}
         </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onCreate(props, options): void {
        this.classList.add("aie-disable");
        this.editor = props.editor;
        this.options = options;
    }

    // @ts-ignore
    onClick(commands) {
        commands.redo();
    }

    // @ts-ignore
    onDisable(editor) {
        return editor.aiEditor.canRedo
    }
}


