import { IToolbarConf } from "../types/editor/module"

export class Boot {
    constructor() {
      throw new Error('不能实例化\nCan not construct a instance')
    }

    //toolbar 配置
    static toolbarConfig: Record<string, any> = {}
    static registerToolbarConfig(toolbar: Record<string, any> = {}) {
        Object.keys(toolbar).forEach(key => {
            if (this.toolbarConfig[key]) {
                Object.assign(this.toolbarConfig[key], toolbar[key])
            } else {
                this.toolbarConfig[key] = {
                    ...toolbar[key]
                }
            }
        })
        return this.toolbarConfig
    }

    static tiptapExtension: any= []
    static registerTiptapExtension(extension: Partial<IToolbarConf> = {}) {
        Array.isArray(extension) ? this.tiptapExtension.push(...extension) : this.tiptapExtension.push(extension)
        return this.tiptapExtension
    }

    static registerTiptapBlock(block: Partial<IToolbarConf> = {}) {
        if (block.blockToolbar) {
            this.registerToolbarConfig(block.blockToolbar)
        }
        if (block.blockExtension) {
            this.registerTiptapExtension(block.blockExtension)
        }
    }
  }