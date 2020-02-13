
import { patch, render } from './core/patch'
import componentList from './common/componentList'
import Button_v1 from './components/Button/v1'
import Select_v1 from './components/Select/v1'
import Div_v1 from './components/Div/v1'
import Card_V1 from './components/Card/v1'
import ParseHtml from './core/parse/parseHtml'
import Optimize from './core/parse/optimize'
import Instrument from './core/index'

let children = [];
componentList.map((item, index) => {
    const component = item.component.html.trim();

    const parseHtml = new ParseHtml(component);

    const optimize = new Optimize(parseHtml.astData, render);

    const vnode = optimize.createElement([optimize.astData], render)


    children.push(vnode[0])
})

window.instance = {
    // 更新函数队列
    queen: [],
    id: 0,
    // 是否进行更新
    pending: false,

    _data: {}
    // dai
}
// button组件
const ButtonComponent =  Button_v1.html.trim()
// div组件
const DivComponent = Div_v1.html.trim()
// Card组件
const Card = Card_V1.html.trim()
// Select组件
const Select = Select_v1.html.trim()

// 初始化解析引擎
console.log(Select_v1)
console.log(Instrument)
const instrument = new Instrument(Select_v1)

// const parseHtml = new ParseHtml(Select);

// const optimize = new Optimize(parseHtml.astData, render)


// console.log('onode', optimize.createElement([optimize.astData], render))

const container = document.getElementById('container');
// const vnode = optimize.createElement([optimize.astData], render)

const testNode = render(
    'div', 
    {
        attrs: {
            "attrs": '12233'
        },
        
        props: {
            "width": "1200"
        },
        on: {
            click: clickHandle
        },
    },
    children,
    "content"
)


// Patch into empty DOM element – this modifies the DOM as a side effect
const app = patch(container, testNode);

function clickHandle() {
    console.warn('触发click事件了')
}


/**
const vnode = render(
    'div#container.two.classes', 
    {
        on: {
            click: clickHandle
        },
    },
    [
        render('span', 
            {
                style: {
                    fontWeight: 'bold'
                }
            },
            'this is bold'
        ),
        'this is normal',
        render(
            'p',
            {
                style: {
                    background: "#000",
                    color: "#c0f"
                }
            },
            [
                render(
                    'a',
                    {
                        props: {
                            href: 'https://www.baidu.com',
                            target: '_blank'
                        }
                    },
                    '测试a链接'
                )
            ]
        ),
        render(
            'button.layui-btn',
            {},
            'layUI button'
        )
    ]
)
 */