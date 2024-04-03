export class FormView {
    constructor() {
        this.inputs = null;
        this.form = document.querySelector("#form-weapon");
        this.imageContainer = document.querySelector(".image-container");
        this.successMessageDisplayed = false;


        this.navDemo = document.getElementById("navDemo");
    }

    updateProgressBar(scrollPercentage) {
        document.getElementById("myBar").style.width = scrollPercentage + "%";
    }

    toggleNav() { 
        if (this.navDemo.className.indexOf("w3-show") == -1) {
            this.navDemo.className += " w3-show";
        } else {
            this.navDemo.className = this.navDemo.className.replace(" w3-show", "");
        }
    }

    formatPropertyName(name) {
        return name.replace(/([A-Z])/g, ' $1').trim();
    }

    createInputs(dataObject) {
        const topSection = document.createElement('div');
        topSection.classList.add('form-section', 'top-section');
        const bottomSection = document.createElement('div');
        bottomSection.classList.add('form-section', 'bottom-section');

        for (let property in dataObject) {
            if (property !== 'defaultValues') {
                const formattedName = this.formatPropertyName(property);
                const placeholderValue = dataObject.defaultValues[property];
                const isReadOnly = property === 'WeaponType' || property === 'WeaponSize' || property === 'HandleType';

                if (property === 'CardNumber') {
                    bottomSection.insertAdjacentHTML("beforeend", '<hr>');
                }

                const section = isReadOnly ? bottomSection : topSection;

                section.insertAdjacentHTML("beforeend", `
                    <p class="form-row">
                        <label>${formattedName}</label>
                        <input name='${property}' 
                               value='${dataObject[property]}' 
                               type='${property === 'Email' ? 'email' : 'text'}' 
                               size='30'
                               placeholder='${placeholderValue}' 
                               ${isReadOnly ? 'readonly' : ''} />
                    </p>
                `);
            }
        }

        this.form.querySelector('fieldset').appendChild(topSection);
        this.form.querySelector('fieldset').appendChild(bottomSection);

        this.inputs = this.form.querySelectorAll("input[type=text], input[type=email]");
    }



    updateImageSource(imageSrc) {
        this.imageContainer.querySelector('img').src = imageSrc;
    }

    displaySuccessMessage = () => {
        if (!this.successMessageDisplayed) {
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Successful submission!';
            successMessage.classList.add('success-message');
            this.form.appendChild(successMessage);
            this.successMessageDisplayed = true;

            setTimeout(() => {
                successMessage.remove();
                this.successMessageDisplayed = false;
            }, 3000);
        }
    }

}
