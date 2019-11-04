

const ButtonComponent = {
    html: `
        <div class="asdf">
            <button class="mdc-button">
                Learn More
            </button>
        </div>
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