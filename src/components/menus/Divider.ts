import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";

export class Divider extends AbstractPopoverButton {
    constructor() {
        super();
        const template = `
        <div no-hover style="width: 1px;height: 20px; display: flex">
            <div class="aie-menu-divider" />
        </div>
        `;
        this.template = template;
    }


}


