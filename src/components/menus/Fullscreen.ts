import { AbstractMenuButton } from "../AbstractMenuButton.ts";
import { svgIcons } from "../../icons/svg.ts"

export class Fullscreen extends AbstractMenuButton {
  fullscreenSvg = svgIcons.fullscreenSvg;
  fullscreenExitSvg = svgIcons.fullscreenExitSvg;
  isFullscreen: boolean = false;

  constructor() {
    super();
    const template = `
        <div>
        ${this.fullscreenSvg}
        </div>
        `;
    this.template = template;
    this.registerClickListener();
  }

  // @ts-ignore
  onClick(commands) {
    const container = this.closest(".aie-container") as HTMLDivElement;
    if (!this.isFullscreen) {
      container.style.height = "calc(100vh - 2px)";
      container.style.width = "calc(100% - 2px)";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.zIndex = "9999";
    } else {
      container.style.height = "100%";
      container.style.width = "";
      container.style.background = "";
      container.style.position = "";
      container.style.top = "";
      container.style.left = "";
      container.style.zIndex = "";
    }
    this.isFullscreen = !this.isFullscreen;
    this.querySelector("div")!.innerHTML = this.isFullscreen
      ? this.fullscreenExitSvg
      : this.fullscreenSvg;
  }
}
