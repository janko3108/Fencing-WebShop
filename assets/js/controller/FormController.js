import { FormValidation } from "../validation/FormValidation.js";

export class FormController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.validator = new FormValidation(this.model, this.view);

        this.loadImage();
        this.view.createInputs(this.model.getInputData());
        this.view.form.addEventListener('submit', this.handleFormSubmit);
        this.view.inputs.forEach(input => {
            input.addEventListener('change', this.handleInputChange);
        });

        const toggleNav = document.getElementById("toggleNavBtn");
        toggleNav.addEventListener("click", this.handleToggleNav);
        window.onscroll = this.handleScroll;


        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", this.handleResetButtonClick);

        this.formSubmitted = false;
    }
    

    handleResetButtonClick = () => {
        this.view.form.querySelector('input[name=FirstName]').value = "";
        this.view.form.querySelector('input[name=LastName]').value = "";
        this.view.form.querySelector('input[name=CardNumber]').value = "";
        this.view.form.querySelector('input[name=Email]').value = "";


        const newWeapon = {
            WeaponType: this.model.WeaponType,  
            WeaponSize: this.model.WeaponSize,  
            HandleType: this.model.HandleType   
        };

        this.model.WeaponType = newWeapon.WeaponType;
        this.model.WeaponSize = newWeapon.WeaponSize;
        this.model.HandleType = newWeapon.HandleType;

        localStorage.setItem("weapon", JSON.stringify(newWeapon));

        this.loadImage();


        this.formSubmitted = false;
    }



    handleScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        this.view.updateProgressBar(scrolled);
    }

    handleInputChange = (event) => {
        if (!this.formSubmitted) {
            return;
        }

        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (this.validator.isValidInput(inputName, inputValue)) {
            this.model[inputName] = inputValue;
            this.model.persist();
            console.log(`Model updated: ${inputName} - ${inputValue}`);
        } else {
            const inputElement = this.view.form.querySelector(`input[name=${inputName}]`);
            this.validator.handleValidationErrors([inputElement]);
        }
    }

    handleToggleNav = () => {
        this.view.toggleNav();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        if (this.validator.isValidFormSubmission()) {
            this.model.FirstName = this.view.form.querySelector('input[name=FirstName]').value;
            this.model.LastName = this.view.form.querySelector('input[name=LastName]').value;
            this.model.CardNumber = this.view.form.querySelector('input[name=CardNumber]').value;
            this.model.Email = this.view.form.querySelector('input[name=Email]').value;


            const weapon = this.model.getInputData();
            weapon.WeaponType = this.view.form.querySelector('input[name=WeaponType]').value;
            weapon.WeaponSize = this.view.form.querySelector('input[name=WeaponSize]').value;
            weapon.HandleType = this.view.form.querySelector('input[name=HandleType]').value;

            localStorage.setItem("weapon", JSON.stringify(weapon));

            console.log('Form submitted and weapon data saved to localStorage');

            this.loadImage();

            this.view.displaySuccessMessage();

            this.formSubmitted = true;
        } else {
            const invalidInputs = Array.from(this.view.form.querySelectorAll('input[type=text], input[type=password]'))
                .filter(input => {
                    const trimmedValue = input.value.trim();

                    if ((input.name === 'FirstName' || input.name === 'LastName') && !/^[A-Za-z]+$/.test(trimmedValue)) {
                        return true;  
                    } else {
                        return trimmedValue === '' || (trimmedValue === this.model.defaultValues[input.name]);
                    }
                });

            const emailInput = this.view.form.querySelector('input[name=Email]');
            if (!this.validator.isValidInput('Email', emailInput.value)) {
                invalidInputs.push(emailInput);
            }

            const cardNumberInput = this.view.form.querySelector('input[name=CardNumber]');
            if (!this.validator.isValidInput('CardNumber', cardNumberInput.value)) {
                invalidInputs.push(cardNumberInput);
            }

            this.validator.handleValidationErrors(invalidInputs);
        }
    }
    loadImage() {
        const weapon = this.model.getInputData();
        const weaponType = weapon.WeaponType;
        const weaponSize = weapon.WeaponSize;
        const handleType = weapon.HandleType;

        const imageSrc = `assets/media/${weaponType}-${weaponSize}-${handleType}.png`;
        this.view.updateImageSource(imageSrc);
    }
}
