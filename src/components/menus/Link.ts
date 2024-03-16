import {AbstractPopoverButton} from "../AbstractPopoverButton.ts";
import {Popover} from "../../commons/Popover.ts";
import {t} from "i18next";
import {Editor} from "@tiptap/core";
import { svgIcons } from "../../icons/svg.ts"

export class Link extends AbstractPopoverButton {

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
            <div>${t("link-address")}</div>
             <div>
             <input type="text" id="href" style="width: 250px"  autocomplete="off">
            </div>
            `);
            // <div style="margin-top: 10px">${t("link-open-type")}</div>
            //     <div>
            //     <select id="target" style="width: 250px">
            //        <option value="">${t("default")}</option>
            //        <option value="_blank">${t("link-open-blank")}</option>
            //     </select>
            //     </div>

            popover.onConfirmClick((instance) => {
                let href = (instance.popper.querySelector("#href") as HTMLInputElement).value;
                // console.log('editor', this.editor?.aiEditor.replaceText('fdadsfafaf'))
                //@ts-ignore
            // const state = this.editor.state
            // const { from, to } = state.selection
            // const marks = state.storedMarks || state.selection.$from.marks()
            // this.editor.chain()
            //     .focus()
            //     .deleteRange(from, to)
            //     .insertContent('替换的内容', marks)
            //     .run()
            if (href.trim() === "") {
                this.editor?.chain().focus().extendMarkRange('link')
                    .unsetLink()
                    .run()
                return;
            }


            // let target: string | null = (instance.popper.querySelector("#target") as HTMLInputElement).value;
            // if (target.trim() === "") {
            //     target = null;
            // }

            if (!href.startsWith('http')) {
                href = 'https://' + href
            }

            this.editor?.chain().focus().extendMarkRange("link")
                .setLink({
                    href,
                    target: '_blank',
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
            // if (attrs && attrs.target) {
            //     (instance.popper.querySelector("#target") as HTMLInputElement).value = attrs.target;
            // }else {
            //     (instance.popper.querySelector("#target") as HTMLInputElement).value = "";
            // }
        })


        popover.setTrigger(this.querySelector("div")!, "bottom");
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("link")
    }


}


