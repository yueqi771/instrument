const ButtonComponent = {
    html: {
        name: "button.layui-btn",
        attrList: {
            class: {

            },
            style: {
    
            },
            props: {
    
            },
        },
        
    },

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