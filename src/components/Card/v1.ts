import BaseComponent from "../BaseComponent/baseComponent";

class Card extends BaseComponent {
    public html: string = ` 
        <div>
            <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                <h3 class="uk-card-title">Default</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div>`
    
    public mount() {}
}

export default new Card()