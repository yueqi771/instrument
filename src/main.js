
import { patch, render } from './core/render'
import Button_v1 from './components/Button/v1'


// layui.use(['layer', 'form'], function(){
//     var layer = layui.layer
//     ,form = layui.form;
    
//     layer.msg('Hello World');
// });

{/* <button type="button" class="layui-btn">一个标准的按钮</button>
<a href="http://www.layui.com" class="layui-btn">一个可跳转的按钮</a> */}

const container = document.getElementById('container');


const vnode = render(
    'div#container.two.classes', 
    {
        on: {
            click: clickHandle
        },
    },
    [
        '这里是div',
        render(
            Button_v1.html.name,
            Button_v1.html.attrList,
            '这里是buttons',
        ),
    ],
)
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);


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