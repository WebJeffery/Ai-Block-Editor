import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {InnerEditor} from "../../core/AiEditor.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Image extends AbstractPopoverButton {

    fileInput?: HTMLInputElement;

    constructor() {
        super();
        const template = `
        <div>
        <input type="file" accept="image/*" multiple  style="display: none">
        ${svgIcons.image}
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }


    connectedCallback() {
        super.connectedCallback();
        if (this.options?.image?.customMenuInvoke) {
            this.querySelector("input")!.remove();
        } else {
            this.fileInput = this.querySelector("input") as HTMLInputElement;
            this.fileInput!.addEventListener("change", () => {
                const files = this.fileInput?.files;
                if (files && files.length > 0) {
                    for (let file of files) {
                        this.editor?.commands.uploadImage(file);
                    }
                }
                (this.fileInput as any).value = "";
            });
        }
    }


    // @ts-ignore
    onClick(commands) {
        if (this.options?.image?.customMenuInvoke) {
            this.options.image.customMenuInvoke((this.editor as InnerEditor).aiEditor);
        } else {
            this.fileInput?.click();
        }
    }

}


