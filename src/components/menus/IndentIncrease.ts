import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class IndentIncrease extends AbstractPopoverButton {
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


