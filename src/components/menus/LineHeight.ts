import {Editor} from "@tiptap/core";
import {AbstractDropdownMenuButton} from "../AbstractDropdownMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"


const titles = ["1.0", "1.25", "1.5", "2.0", "2.5", "3.0"];

export class LineHeight extends AbstractDropdownMenuButton<string> {

    constructor() {
        super();
        this.menuData = titles;
        this.refreshMenuText = false;
        this.dropDivHeight = "180px"
        this.dropDivWith = "70px"
        this.width="36px"
        this.menuTextWidth="20px"
    }

    onDropdownActive(editor: Editor, index: number): boolean {
        return editor.isActive({"lineHeight": `${(Number(this.menuData[index]) * 100).toFixed(0)}%`});
    }

    onDropdownItemClick(index: number): void {
        const lineHeight = `${(Number(this.menuData[index]) * 100).toFixed(0)}%`;
        this.editor!.chain().setLineHeight(lineHeight).run();
    }

    onDropdownItemRender(index: number): Element | string {
        return this.menuData[index];
    }

    onMenuTextRender(_: number): Element | string {
        return `
              <div style="width:18px;height: 18px;">
                ${svgIcons.lineHeight}
              </div>
         `;
    }
}


