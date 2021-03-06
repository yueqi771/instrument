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

interface NodeType {
    tag: string; 
    attrList: any[];
    text?: string,
    children?: StackType[],
    for?: string;
    alias?: string;
    iterator1?: string,
}

export { MachHtml, StackType, NodeType }