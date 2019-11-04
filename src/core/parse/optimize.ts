import * as AstData from '../../interface/astData'
import Widgets from '../utils/widgets'

/**
 * @class 将ast处理成可渲染的虚拟dom
 */
class Optimize {
    // 初始ast树
    private _intialAst: AstData.initialAst;

    // 操作的ast结构
    public astData: any

    // 公用方法
    public widgets: Widgets;

    // render方法
    render: any
    
    constructor(astData: AstData.initialAst, render: any) {
        this.widgets = new Widgets();
        this._intialAst = this.astData = this.widgets.deepClone(astData);
        this.render = render


        this.traverAst(this.astData, this.codgen);
    }

    /**
	 * @func 广度优先法遍历ast树
	 * @param nodeData节点数据
	 * @param callBack回调函数
	 */
	traverAst(node: AstData.nodeData, callBack?: any): void {
		const _this = this;
		let queue: any[] = [],
			count: number = 0,
			nodeData: any =  node;

		while(nodeData != null) {
			callBack && (callBack.apply(_this, [nodeData, count]));

			if(nodeData.children && nodeData.children.length != 0) {
				count ++ ;
				for(let i: number = 0; i < nodeData.children.length; i++) {
					queue.push(nodeData.children[i]);
				}
			}

			nodeData = queue.shift();
		}

		return nodeData
    }
    
    /**
     * @func 解析ast数据
     */
    codgen(node: AstData.nodeData) {
        console.log('codgenNode', node)
        const id = node.attrList.id ? '#'+node.attrList.id : '';
        const classState = node.attrList.class ? `.${node.attrList.class.split(' ').join('.')}` : '';

        node.html = `${node.tag}${id}${classState}`
        delete node.attrList.class
    }


    /**
     * 返回最终的ast树
     */
    createElement(node: AstData.nodeData[], createElement: any): any {
        if(!node) { return }
        return node.map((item: any) => {
			const text: string = item.text ? item.text : ''

			// 如果存在嵌套关系, 递归执行此方法
			if (item.children && item.children.length > 0) {
                console.log('createElement',)
				return createElement(item.html, item.attrList, [
					text,
					...this.createElement(item.children, createElement)
				])
			} else {
				// 如果只有一层接口， 不存在嵌套的话， 直接return
				return createElement(item.tag, item.attrList, [text])
			}
		})
    }

}

export default Optimize