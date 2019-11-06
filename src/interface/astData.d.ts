interface initialAst {
    tag: string,
    attrList?: any;
}

interface nodeData {
    html: string,
    tag: string,
    attrList?: any
    children?: nodeData[],
    text?: string,
    props?: any,
}

export { initialAst, nodeData }