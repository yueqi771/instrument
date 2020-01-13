import Dep from './dep'
class Observer {
    // 存放传入的数据
    data: any

    // dep对象实例
    dep: Dep;

    // 实例id
    id: number = 0

    constructor(data: any) {
        this.data = data
        this.dep = new Dep()

        this.id += 1

        // 将对象设置为响应式的对象
        this.def(data, '__ob__', this)

        // 设置响应式的数据对象
        this.walk(data)
    }

    /**
     * @func 动态给对象设置属性
     */
    def(obj: any , key: string, value: any, enumerable?: boolean) {
        Object.defineProperty(obj, key, {
            value,
            enumerable: !!enumerable,
            writable: true,
            configurable: true,
        })
    }

    /**
     * @func 将对象设置为响应式的数据对象
     * @params 需要转化的对象
     */
    walk(data: Object) {
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            this.defineReactive()
        }
    }

    defineReactive() {
        
    }
}

export default Observer