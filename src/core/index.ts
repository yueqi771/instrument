import Widgets from './widgets'
import Observer from '../core/observer/index'

/**
 * @class instrument实例， 解析html组件
 * @params 组件对象
 * @return vnode
 */
class Instrument {
    widgets: Widgets
    _data: any
    constructor(component: any) {
        this.widgets = new Widgets();
        // 执行init方法， 初始化组件的数据， 初始话组件的声明周期
        this._data = component.data
        this.init(component)
    }

    /**
     * @func 将数据转化为响应式的数据
     */

    /**
     * @fucn 初始化解析引擎
     */
    init(component: any) {    
        this.initData(component.data)
    }

    /**
     * @func 初始化数据仓库
     */
    initData(data: any) {
        const observerData = data;
        const keys = Object.keys(observerData);
        
        let i = keys.length;

        while(i--) {
            const key = keys[i]
            console.log('key', key)
            this.proxy((window as any).instance._data, '_data', key)
        }

        this.observer((window as any).instance._data)
        console.log((window as any).instance._data)
    }

    /**
     * 数据代理
     */
    proxy(target: any, sourceKey: string, key: string) {
        const _this: any = this
        const sharedPropertyDefinition = {
            enumerable: true,
            configurable: true,
            get: () => {},
            set: (val: any) => {}
        }
        sharedPropertyDefinition.get = () => {
            console.log('访问数据', this)
            return _this[sourceKey][key]
        }

        sharedPropertyDefinition.set = (val: any) => {
            _this[sourceKey][key] = val
        }

        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    /**
     * 初始化observer对象
     */
    observer(data: any) {
        // 判断是否为对象
        console.log('type', this.widgets.TypeContent.isObject(data))
        if(!this.widgets.TypeContent.isArray(data) && !this.widgets.TypeContent.isObject(data) ) {
            return
        }

        let ob;

        // 如果对象存在ob属性
        if(this.hasOwn(data, '__ob__')) {
            ob = data.__ob__
        }else {
            ob = new Observer(data)
        }
        
        return ob
    }

    /**
     * @func 判断一个对象是否具有某个属性
     */
    hasOwn(obj: any, key: string) {
        return Object.prototype.hasOwnProperty.call(obj, key)
    }
}

export default Instrument