const SelectComponent = {
    html: `
        <div class="uk-margin">
            <div uk-form-custom="target: > * > span:last-child">
                <select>
                    <option value="1">Option 01</option>
                    <option value="2">Option 02</option>
                    <option value="3">Option 03</option>
                    <option value="4">Option 04</option>
                </select>
                <span class="uk-link">
                    <span uk-icon="icon: pencil"></span>
                    <span></span>
                </span>
            </div>
        </div>
    `
}

export default SelectComponent