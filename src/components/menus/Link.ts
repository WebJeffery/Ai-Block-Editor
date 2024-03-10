import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {Popover} from "../../commons/Popover.ts";
import {t} from "i18next";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Link extends AbstractMenuButton {

    constructor() {
        super();
        const template = `
        <div>
            ${svgIcons.link}
        </div>
        `;
        this.template = template;
    }

    connectedCallback() {
        super.connectedCallback();
        const popover  = new Popover();
        popover.setContent(`
            <div style="width: 250px">${t("link-address")}</div>
             <div style="width: 250px">
             <input type="text" id="href" style="width: 250px">
            </div>
            
            <div style="margin-top: 10px">${t("link-open-type")}</div>
            <div>
            <select id="target" style="width: 250px">
               <option value="">${t("default")}</option>
               <option value="_blank">${t("link-open-blank")}</option>
            </select>
            </div>
        `);


        popover.onConfirmClick((instance) => {
            const href = (instance.popper.querySelector("#href") as HTMLInputElement).value;
            if (href.trim() === "") {
                this.editor?.chain().focus().extendMarkRange('link')
                    .unsetLink()
                    .run()
                return;
            }


            let target: string | null = (instance.popper.querySelector("#target") as HTMLInputElement).value;
            if (target.trim() === "") {
                target = null;
            }

            this.editor?.chain().focus().extendMarkRange("link")
                .setLink({
                    href,
                    target,
                    rel: null,
                }).run()
        });

        popover.onShow((instance) => {
            const attrs = this.editor?.getAttributes("link");
            if (attrs && attrs.href) {
                (instance.popper.querySelector("#href") as HTMLInputElement).value = attrs.href;
            }else {
                (instance.popper.querySelector("#href") as HTMLInputElement).value ="";
            }
            if (attrs && attrs.target) {
                (instance.popper.querySelector("#target") as HTMLInputElement).value = attrs.target;
            }else {
                (instance.popper.querySelector("#target") as HTMLInputElement).value = "";
            }
        })


        popover.setTrigger(this.querySelector("div")!, "bottom");
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("link")
    }


}


