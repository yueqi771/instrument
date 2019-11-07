const snabbdom = require('snabbdom');


const patch = snabbdom.init([
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/attributes').default,
    require('snabbdom/modules/dataset').default,
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
])

const render = require('snabbdom/h').default;

export {
    patch, render
}