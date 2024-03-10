import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Painter extends AbstractMenuButton {

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
    onClick(commands) {
        commands.setPainter(this.editor?.state.selection.$head.marks())
        // console.log( htmlElement.style.cursor)
    }

}


