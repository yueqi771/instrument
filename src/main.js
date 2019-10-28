const snabbdom = require('snabbdom');


const patch = snabbdom.init([
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
])

// 创建vnode方法
const h = require('snabbdom/h').default;

const container = document.getElementById('container');

const vnode = h(
    'div#container.two.classes', 
    {
        on: {
            click: clickHandle
        },
    },
    [
        h('span', 
            {
                style: {
                    fontWeight: 'bold'
                }
            },
            'this is bold'
        ),
        'this is normal',
        h(
            'p',
            {
                style: {
                    background: "#000",
                    color: "#c0f"
                }
            },
            [
                h(
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
        )
    ]
)

console.log(patch)

// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);


function clickHandle() {
    console.warn('触发click事件了')
}