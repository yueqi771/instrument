import Dep from "./dep";

class Watcher<Instance>  {
    // 根数据对象
    public instance: Instance | any
    
    public id: number = 0;

    public nextTickCallBacks: Array<() => void> = [];

    public isUsingMicroTask: boolean = false;


    // 更新函数
    updateFn: () => void = () => {}

    // 回调函数
    callback: () => void = () => {}

    // watcherId

    // ta
    targetStatck: Array<any> = []

    depIds: Set<any> = new Set()

    // 新的depid
    newDepIds: Set<any> = new Set()

    // dep实例数组
    newDeps: Array<Dep> = []


    constructor(updateFn:  () => void){
        this.updateFn = updateFn;

        this.id = (window as any).instance.id++ 

    }   

    // 初始化异步函数
    initQueenTask() {
        let microTimerFunc: boolean = false;
        let macroTimerFunc: boolean = false;
        let useMacroTask: boolean = false;
    }

    // 
    public get() {

    }

    // 将watcher收集起开
    public pushTarget(target: Watcher<any>): void {
        this.targetStatck.push(target);
        (Dep as any).target = target

        const value = this.updateFn.call(this.instance);
    }

    // 添加依赖
    addDep(dep: Dep) {
        const id = dep.id;
        if(!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
        }

        if(!this.depIds.has(id)) {
            dep.addSub(this)
        }
    }

    update() {
        this.qweenWatcher(this)
    }

    qweenWatcher(watcher: Watcher<any>) {
        const id = watcher.id;
        (window as any).instance.queen.push(watcher)
    }

    nextTick(callback?: () => void, ctx?: any) {
        let _resolve: any;
        const instance = (window as any).instance
        this.nextTickCallBacks.push(() => {
            if(callback) {
                try {
                    callback.call(ctx)
                }catch(err) {

                }
            }else if(_resolve) {
                _resolve(ctx)
            }
        })

        if(!instance.pending) {
            instance.pending = true;
            this.timerFunc()
        }   
    }

    // 执行异步函数
    flushCallbacks() {
        debugger
        const instance = (window as any).instance;
        instance.pending = false;
        // 有个小问题， 此处为何要用slice方法呢
        const copise = this.nextTickCallBacks.slice(0);
        this.nextTickCallBacks.length = 0;
        for(let i = 0; i < copise.length; i++) {
            copise[i]()
        }
    }

    timerFunc() {
        debugger
        if(typeof Promise !== 'undefined' && this.isNative(Promise))  {
            const p = Promise.resolve()
            return () => {
                Promise.resolve().then(this.flushCallbacks)
            }
        }

        if(typeof MutationObserver !== 'undefined' && (this.isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
            let counter = 1;
            let observer = new MutationObserver(this.flushCallbacks);
            let textNode = document.createTextNode(String(counter));
            observer.observe(textNode, {
                characterData: true
            });

            this.isUsingMicroTask = true;

            return () => {
                counter = (counter + 1) % 2;
                textNode.data = String(counter);
            };
        }

        if(typeof setImmediate !== 'undefined' && this.isNative(setImmediate))  {
            return () => {
                setImmediate(this.flushCallbacks)
            }
        }

        return () => {
            setTimeout(this.flushCallbacks, 0);
        }
    }

    // 检测该方法是否是原生的方法
    isNative (Ctor: any) {
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }

}

export default Watcher
