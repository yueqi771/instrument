
import { patch, render } from './core/patch'
import Button_v1 from './components/Button/v1'
import Select_v1 from './components/Select/v1'
import Div_v1 from './components/Div/v1'
import Card_V1 from './components/Card/v1'
import ParseHtml from './core/parse/parseHtml'
import Optimize from './core/parse/optimize'

// button组件
const ButtonComponent =  Button_v1.html.trim()
// div组件
const DivComponent = Div_v1.html.trim()
// Card组件
const Card = Card_V1.html.trim()
// Select组件
const Select = Select_v1.html.trim()

const parseHtml = new ParseHtml(Select);
const optimize = new Optimize(parseHtml.astData, render)

console.log('onode', optimize.createElement([optimize.astData], render))

const container = document.getElementById('container');
const vnode = optimize.createElement([optimize.astData], render)

const testNode = render(
    'div#container.two.classes', 
    {
        on: {
            click: clickHandle
        },
    },
    [
  
    ],
)


// Patch into empty DOM element – this modifies the DOM as a side effect
const app = patch(container, vnode[0]);

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