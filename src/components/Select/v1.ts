const SelectComponent = {
    html:`<div ifor="item in [1, 2, 3]" uk-form-custom="target: > * > span:first-child">
            <select>
                <option value="">Please select...</option>
                <option value="1">Option 01</option>
                <option value="2">Option 02</option>
                <option value="3">Option 03</option>
                <option value="4">Option 04</option>
            </select>
            <button class="uk-button uk-button-default" type="button" tabindex="-1">
                <span></span>
                <span uk-icon="icon: chevron-down"></span>
            </button>
        </div>`
}


// `
//         <div class="uk-margin">
//             <div uk-form-custom="target: > * > span:last-child">
//                 <select>
//                     <option value="1">Option 01</option>
//                     <option value="2">Option 02</option>
//                     <option value="3">Option 03</option>
//                     <option value="4">Option 04</option>
//                 </select>
//                 <span class="uk-link">
//                     <span uk-icon="icon: pencil"></span>
//                     <span></span>
//                 </span>
//             </div>
//         </div>
//     `

export default SelectComponent