
/**
 * @class 将html转化成ast树
 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const htmlReg = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${htmlReg}\\:)?${htmlReg})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/


class ParseHtml {
    private _index: number = 0;

    // 当前解析方法
    private _html: string = ""

    constructor(html: string) {
        let text, rest, next;

        this._html = html
        // console.log(html.replace(reg,''))
        console.log(unicodeRegExp.source)

        while(this._html) {
            let textEnd = html.indexOf('<')
            console.log('textEnd', textEnd)

            if(textEnd === 0) {
                const startTageMatch = this.parseStartTag(this._html, 0)
            }

            if(textEnd >= 0) {
                // 逐个取出标签的内容
                rest = html.slice(textEnd)
                if(startTagOpen.test(rest)) {
                    next = rest.indexOf('<', 1);
                    textEnd += next
                    rest = html.slice(textEnd)
                }
                
                text = html.substring(0, textEnd)
                console.log(text)
            }
            this._html = ""
            break
        }
    }

    /**
     * @function 取得标签里面的属性
     */
    parseStartTag(html: string, index: number) {
        const start  = this._html.match(startTagOpen);

        // 如果匹配到了开始标签
        if(start) {
            const match = {
                tarName: start[1],
                attrs: [],
                start: index
            }

            this.advance(start[0].length)
        }

        let end, attr: any = {};
        // while(!end || !attr) {
        //     end = html.match(startTagClose)
        //     attr = html.match(attribute
        // }
        // while(!end || !attr) {
        debugger
        attr.start = index
        end = html.match(startTagClose);
        attr = html.match(attribute)
        end = "123"
        // }
    }

    /**
     * @function 继续向下解析html标签
     */
    advance(step: number) {
        this._index += step;
        this._html = this._html.substring(step);
    }
}

export default ParseHtml