import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Redo extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
         <div style="height: 16px">
            ${svgIcons.redo}
         </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.redo();
    }
}


