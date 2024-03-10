export type EditorOptions = {
    element: string | Element,
    content?: string,
    contentRetention?: boolean,
    contentRetentionKey?: string,
    header: Element | boolean,
    footer: Element | boolean,
    lang?: string,
    editable?: boolean,
    i18n?: Record<string, Record<string, string>>,
    placeholder?: string,
    theme?: "light" | "dark",
    cbName?: string,
    cbUrl?: string
    onMentionQuery?: (query: string) => any[] | Promise<any[]>,
    onCreateBefore?: (editor: AiEditor, extensions: Extensions) => void | Extensions,
    onDestroy?: (editor: AiEditor) => void,
    onCreated?: (editor: AiEditor) => void,
    onChange?: (editor: AiEditor) => void,
    onSave?: (editor: AiEditor) => boolean,
    toolbarKeys?: (string | CustomMenu)[],
    link?: {
        autolink?: boolean,
        rel?: string,
        class?: string,
    },
    uploader?: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string) => Promise<Record<string, any>>,
    image?: {
        customMenuInvoke?: (editor: AiEditor) => void;
        uploadUrl?: string,
        uploadHeaders?: Record<string, any>,
        uploader?: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string) => Promise<Record<string, any>>,
        uploaderEvent?: UploaderEvent,
        defaultSize?: number,
        allowBase64?: boolean,
    },
    video?: {
        customMenuInvoke?: (editor: AiEditor) => void;
        uploadUrl?: string,
        uploadHeaders?: Record<string, any>,
        uploader?: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string) => Promise<Record<string, any>>,
        uploaderEvent?: UploaderEvent,
    },
    attachment?: {
        customMenuInvoke?: (editor: AiEditor) => void;
        uploadUrl?: string,
        uploadHeaders?: Record<string, any>,
        uploader?: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string) => Promise<Record<string, any>>,
        uploaderEvent?: UploaderEvent,
    },
    fontFamily?: {
        values: NameAndValue[]
    },
    fontSize?: {
        values: NameAndValue[]
    },
    ai?: AiGlobalConfig,
}