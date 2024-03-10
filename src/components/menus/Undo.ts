import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Undo extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div style="height: 16px">
            ${svgIcons.undo}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.undo();
    }

}


