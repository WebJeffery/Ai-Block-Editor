import {AiEditorOptions, AiEditorEvent, CustomMenu} from "../core/AiEditor.ts";
import {Editor, EditorEvents} from "@tiptap/core";
// @ts-ignore
import {ChainedCommands} from "@tiptap/core/dist/packages/core/src/types";
import { createElement } from "../util/dom.ts";
import tippy from "tippy.js";

export class AbstractPopoverButton extends HTMLElement implements AiEditorEvent {

    popElement: HTMLElement = createElement('div', { className: 'aie-popover-button'}) as HTMLElement;
    template: string = '';
    editor?: Editor;
    options?: AiEditorOptions;

    protected constructor() {
        super();
    }

    protected registerClickListener() {
        this.popElement.addEventListener("click", () => {
            const chain = this.editor?.chain();
            this.onClick(chain);
            chain?.run();
            this.editor?.commands.focus()
        })
    }

    connectedCallback() {
        this.popElement.innerHTML = this.template;
        this.appendChild(this.popElement)
    }

    // @ts-ignore
    onClick(commands: ChainedCommands) {
        //do nothing
    }

    onCreate(props: EditorEvents["create"], options: AiEditorOptions): void {
        this.editor = props.editor;
        this.options = options;
    }

    onPopover(tip: string): void {
        tip && tippy(this.popElement, {
            appendTo: () => this.editor?.view.dom.closest(".aie-container")!,
            content: tip,
            theme: 'aietip',
            arrow: true,
            // trigger:"click",
            // interactive:true,
        });
    }

    onTransaction(event: EditorEvents["transaction"]): void {
        const htmlDivElement = this.querySelector("div");
        if (!htmlDivElement) return;

        if (this.onActive(event.editor)) {
            htmlDivElement.classList.add("active")
        } else {
            htmlDivElement.classList.remove("active")
        }

        if (this.onDisable(event.editor)) {
            this.classList.add("aie-disable")
        } else {
            this.classList.remove("aie-disable")
        }
    }

    // @ts-ignore
    onActive(editor: Editor): boolean {
        return false
    }

    // @ts-ignore
    onDisable(editor: Editor): boolean {
        return false
    }

    // @ts-ignore
    onConfig(config: CustomMenu) {
        //do nothing
    }
}



