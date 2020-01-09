

const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const htmlReg = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${htmlReg}\\:)?${htmlReg})`;

const Regexp = {
    htmlReg: `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`,
    startTagOpen: new RegExp(`^<${qnameCapture}`),
    startTagClose: /^\s*(\/?)>/,
    attribute: /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
    dynamicArgAttribute: /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
    endTag: new RegExp(`^<\\/${qnameCapture}[^>]*>`),
    encodedAttr: /&(?:lt|gt|quot|amp|#39);/g,
    encodedAttrWithNewLines: /&(?:lt|gt|quot|amp|#39|#10|#9);/g,
    forAlias: /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    forIterator: /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    decodingMap: {
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&amp;': '&',
        '&#10;': '\n',
        '&#9;': '\t',
        '&#39;': "'"
    },
}

export default Regexp