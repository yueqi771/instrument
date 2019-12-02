

const ButtonComponent = {
    html: `
        <p uk-margin>
            <a class="uk-button uk-button-default" href="#">Link</a>
            <button class="uk-button uk-button-default">Button</button>
            <button class="uk-button uk-button-default" disabled>Disabled</button>
        </p>
    `,
   
    data() {
        return {
            text: '按钮文案'
        }
    },

    mounted() {
        console.log('按钮组件加载完成了')
    }

}

export default ButtonComponent