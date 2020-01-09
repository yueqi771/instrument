class Dep {
    // dep实例的id
    id: number = 0

    // 存储通知对象的回调函数
    subs: Array<any> = []

    target: any

    constructor() {

    }

    /**
     * @func 添加通知回调
     * @params sub回调函数
     */
    addSub(sub: any) {
        this.subs.push(sub)
    }

    /**
     * @func 删除回调函数
     */
    removeSub(sub: any) {
        if (this.subs.length) {
            var index = this.subs.indexOf(sub);
            if (index > -1) {
              return this.subs.splice(index, 1)
            }
        }
    }

    /**
     * @func 依赖收集 
     */
    depend() {
        if(this.target) {
            this.target.addDep(this)
        }
    }

    /**
     * @func 通知函数
     */
    notify() {
        let subs = this.subs.slice();
        
        for(let i = 0; i < this.subs.length; i ++) {
            subs[i].update()
        }
    }
}

export default Dep