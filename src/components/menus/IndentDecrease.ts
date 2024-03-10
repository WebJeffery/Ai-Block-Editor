import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class IndentDecrease extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.indentDecrease}
         </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.outdent();
        // this.editor.commands.focus()
    }

}


