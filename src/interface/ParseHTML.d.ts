import ParseHTML from '../core/parseHtml'

interface ParseHTMLTypes extends ParseHTML {

}

interface MachHtml {
    tagName: string,
    attrs: string[],
    start: number,
    end?: number,
    unarySlash?: any,
}

interface StackType {
    tag: string,
    attrs: any[],
    end?: number,
    text?: string,
    children: StackType[]
}

export { MachHtml, StackType }