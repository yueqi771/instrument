

const ButtonComponent = {
    html: `
    <button id="add-to-favorites"
        class="mdc-icon-button"
        aria-label="Add to favorites"
        aria-hidden="true"
        aria-pressed="false">
        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
        <i class="material-icons mdc-icon-button__icon">favorite_border</i>
    </button>
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