import BaseComponent from '../BaseComponent/baseComponent'
import './index.less'

class DivComponent extends BaseComponent{
    public html: string = `
        <div class="div-component">
            这里是div容器
        </div>
    `

    constructor() {
        super()
    }

    public data() {

    }

    private mount() {

    }
}

export default new DivComponent()