import * as ParseHTMLTypes from "../../interface/ParseHTML";
import Regexp from '../utils/regexp'

/**
 * @class 将html转化成ast树
 * @input html字符串
 * @output ast树
 */
class ParseHtml {
    // 解析html字符串的当前索引
    private _index: number = 0;

    // ast格式数据
    public astData: any = {};

    // dom解析后存放的栈
    stack: any[] = [];

    // 当前解析的html字符串
    private _html: string = "";


    constructor(html: string) {
        this._html = html;

        //开始解析
        this.startParse();

        this.astData = this.stack[0]
    }

    /**
     * @func 循环解析html
     * @params
     */
    startParse() {
        let text, rest, next;

        while(this._html) {
            let currentIndex = this._html.indexOf('<');

            if(currentIndex === 0) {
                // 匹配结束标签
                const endTagMatch = this._html.match(Regexp.endTag);
                if(endTagMatch) {
                    this.advance(endTagMatch[0].length)
                    this.parseEndTag(endTagMatch[1], this._index, this._index)
                    continue
                }
   
                const startTageMatch = this.parseStartTag(this._html, 0)
                this.handleStartTag(startTageMatch)
                if(this.matchLine(startTageMatch.tagName, this._html)) {
                    this.advance(1)
                }
                continue
            }

            if(currentIndex >= 0) {
                // 逐个取出标签的内容
                rest = this._html.slice(currentIndex)
                while(
                    !Regexp.endTag.test(rest) && 
                    !Regexp.startTagOpen.test(rest)
                ) {
                    next = rest.indexOf('<', 1);
                    currentIndex += next
                    rest = this._html.slice(currentIndex);
                }
                
                text = this._html.substring(0, currentIndex).replace(/\s/ig,'');
            }

            if (text) {
                this.stack[this.stack.length - 1].text = text

                this.advance(text.length)
            }
            
            this._html = this._html.trim()
        }
    }

    /**
     * @function 解析结束标签
     * @param tagName 标签名
     * @param start 标签开始位置
     * @param end 标签结束位置
     * @return 取得标签里面的属性
     */
    parseEndTag(tagName: string, start: number, end: number) {
        // 当前标签在栈中的位置
        let position = -1;

        for(position = this.stack.length - 1; position >= 0; position --) {
            if(position === 0) { return }   

            // 处理层级关系
            let children = this.stack[position - 1].children;
            
            // 将新解析的标签放到之前没有匹配到结尾标签的元素里面
            children ? 
                this.stack[position - 1].children.push(this.stack[position]) 
                : 
                this.stack[position - 1].children = [this.stack[position]]

            this.stack.pop();
            break
        }
    }

    /**
     * @function 解析开始标签
     * @param html html字符串
     * @param index 当前位置
     * @return 取得标签里面的属性
     */
    parseStartTag(html: string, index: number): ParseHTMLTypes.MachHtml{
        // 匹配到第一个开始标签
        const start  = this._html.match(Regexp.startTagOpen);

        let match: ParseHTMLTypes.MachHtml = {
            tagName: "",
            attrs: [],
            start: 0
        }

        // 匹配到了开始标签
        if(start) {
            match = {
                tagName: start[1],
                attrs: [],
                start: index
            }

            // 前进目标元素的长度
            this.advance(start[0].length)
        }

        let end, attr: any = {};

        while(!(end = this._html.match(Regexp.startTagClose)) && (attr = this._html.match(Regexp.dynamicArgAttribute) || this._html.match(Regexp.attribute))) {
            // 从第一个将匹配到的属性放到attr对象里面
            attr.start = index;
            this.advance(attr[0].length);
            attr.end = index;
            match.attrs.push(attr)
        }

        if(end) {
            this.advance(end[0].length)
            match.end = index

            return match
        }   

        return match
    }

    /**
     * @func 将匹配到的内容入栈
     * @param 匹配到的对象
     */
    handleStartTag(match: ParseHTMLTypes.MachHtml) {
        const tagName = match.tagName;
        const length = match.attrs.length;
        const attrs = new Array(length);

        for(let index = 0; index < length; index++) {
            const args = match.attrs[index];
            const value = args[3] || args[4] || args[5] || ''

            attrs[index] = {
                name: args[1],
                value: this.getAttrValue(value, false)
            }
        }

        const attrList = this.formatAttr(attrs);

        const nodeData = { 
            tag: tagName, 
            attrList
        }
        this.stack.push(nodeData)

        this.parseForDirective(nodeData);
    }

    /**
     * @function 继续向下解析html标签
     */
    advance(step: number) {
        this._index += step;
        this._html = this._html.substring(step);
    }

    /**
     * @func 处理属性
     * @param step 
     */
    getAttrValue(value: string, shouldDecodeNewlines: boolean) {
        const reg = shouldDecodeNewlines ? Regexp.encodedAttrWithNewLines : Regexp.encodedAttr
        return value.replace(reg, match => (Regexp as any).decodingMap[match])
    }

     /**
     * @func 匹配到换行附
     */
    matchLine(tag: string, html: string): boolean | string {
        return (tag && html[0] === '\n')
    }

    /**
     * @func formatAttr 格式化数据参数
     * @param attr数组  
     */
    formatAttr(attr: any[]) {
        let result: any = {}
        attr.forEach((item, index) => {
            result[item.name] = item.value
        })

        return result
    }

    /**
     * 解析for指令
     */
    parseForDirective(node: ParseHTMLTypes.NodeType,) {
        console.log(node)
        // 获取for循环指令的属性， 并且移除它
        
    }

    /**
     * @func 获取属性列表中的for循环指令
     * 
     */
    getAndRemoveAttr(node: Node,  attr: string) {
        if(!node.attrList[attr]) { return; }

        let val = "";
        val = node.attrList[attr]；
        node.attrList[attr].map((item, index) => {
            // 把这个属性从属性列表中移除
        })

        return val
    }
}

export default ParseHtml
