import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class IndentIncrease extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.indentIncrease}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.indent();
        // this.editor.commands.focus()
    }

}


