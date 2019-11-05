
import { patch, render } from './core/patch'
import Button_v1 from './components/Button/v1'
import Select_v1 from './components/Select/v1'
// import { MDCChipSet } from '@material/chips';
import ParseHtml from './core/parse/parseHtml'
import Optimize from './core/parse/optimize'
// import 'material-components-web/dist/material-components-web.css'
import { MDCIconButtonToggle } from '@material/icon-button'

const mdc = require('material-components-web')

mdc.autoInit()




const ButtonComponent =  Button_v1.html.trim()
const parseHtml = new ParseHtml(ButtonComponent);
const optimize = new Optimize(parseHtml.astData, render)
console.log(optimize)

console.log('onode', optimize.createElement([optimize.astData], render))

const container = document.getElementById('container');
console.log('astData', optimize.astData)
const onode = optimize.createElement([optimize.astData], render)

const vnode = render(
    'div#container.two.classes', 
    {
        on: {
            click: clickHandle
        },
    },
    [
    //     <p uk-margin>
    //     <a class="uk-button uk-button-default" href="#">Link</a>
    //     <button class="uk-button uk-button-default">Button</button>
    //     <button class="uk-button uk-button-default" disabled>Disabled</button>
    // </p>
        render(
            'a.uk-button.uk-button-default',
            "12312"
        )
    ],
)


// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, onode[0]);

// const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-button'));
//       iconToggle.unbounded = true


function clickHandle() {
    console.warn('触发click事件了')
    // window['mdc'].button.MDCButton.attachTo(document.querySelector('.mdc-button'));
    // const chipSetEl = document.querySelector('.mdc-chip-set');

    // const chipSet = new MDCChipSet(chipSetEl);

    // console.log(chipSet)

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