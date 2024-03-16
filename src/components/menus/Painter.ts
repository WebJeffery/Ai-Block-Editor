import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Painter extends AbstractPopoverButton {

    constructor() {
        super();
        const template = `
        <div style="height: 16px">
        ${svgIcons.brush}
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
        commands.setPainter(this.editor?.state.selection.$head.marks())
        // console.log( htmlElement.style.cursor)
    }

    // @ts-ignore
    onDisable(editor) {
        return !this.editor?.state.selection.$head.marks().length
    }

}


