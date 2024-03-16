import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Eraser extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div style="height: 16px">
            ${svgIcons.eraser}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.unsetAllMarks();
    }

}


