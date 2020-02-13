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
            this.defineReactive(data, keys[i])
        }
    }

    defineReactive(obj: any, key: string, val?: any, ) {
        const dep = new Dep()
        let property = Object.getOwnPropertyDescriptor(obj, key);

        // 如果属性存在并且暑期属性的可读写选项不为false, 那么直接return
        if(property && property.configurable === false) {
            return
        }

        const getter = property && property.get
        const setter = property && property.set

        if((!getter || setter) && arguments.length === 2) {
            (window as any).val = obj[key]
        }

        // 如果存在嵌套关系， 那么递归吊用
        Object.defineProperty(obj, key, {
            enumerable: true, 
            configurable: true, 
            get: function reactiveGetter() {
                const value = getter ? getter.call(obj) : (window as any).val;

                // 备份
                (window as any).val = value;
                if(dep.target) { 
                    dep.depend()
                }

                return value
            },

            set: function reactiveSetter(newValue) {
                const value = getter ? getter.call(obj) : (window as any).val;

                if(newValue === value) {
                    return
                }
                debugger
                if(getter && !setter) { return }
                if(setter) {
                    setter.call(obj, newValue)
                }else {
                    (window as any).val = newValue
                }

                dep.notify()
            }
        })
    }
}

export default Observer