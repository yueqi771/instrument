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
    }
}

export default Observer