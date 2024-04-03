export class FormValidation {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    isValidFormSubmission() {
        return this.validateEmptyInputs() && this.validateCardInput() && this.validateEmail();
    }

    validateEmptyInputs() {
        const inputs = Array.from(this.view.form.querySelectorAll('input[type=text], input[type=password]'));

        const invalidInputs = inputs.filter(input => {
            const trimmedValue = input.value.trim();
            if ((input.name === 'FirstName' || input.name === 'LastName') && !/^[A-Za-z]+$/.test(trimmedValue)) {
                return true;  
            } else {
                return trimmedValue === '' || (trimmedValue === this.model.defaultValues[input.name]);
            }
        });

        this.handleValidationErrors(invalidInputs);

        return invalidInputs.length === 0;
    }

    isValidInput(inputName, inputValue) {
        const input = this.view.form.querySelector(`input[name=${inputName}]`);
        const trimmedValue = inputValue.trim();

        if ((inputName === 'FirstName' || inputName === 'LastName') && !/^[A-Za-z]+$/.test(trimmedValue)) {
            this.handleValidationErrors([input], 'Invalid input for first name or last name');
            return false;
        } else if (trimmedValue === '' || (trimmedValue === this.model.defaultValues[inputName])) {
            this.handleValidationErrors([input], 'Invalid input');
            return false;
        }

        if (inputName === 'CardNumber') {
            const creditCardValue = trimmedValue.replace(/\s/g, ''); 

            if (!/^[0-9 ]*$/.test(creditCardValue)) {
                this.handleValidationErrors([input], 'Credit card number must contain only numbers and spaces');
                return false;
            }

            const creditCardPattern = /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/;
            if (!creditCardPattern.test(creditCardValue)) {
                this.handleValidationErrors([input], 'Invalid credit card number format');
                return false;
            }
        }

        return true;
    }


    validateEmail() {   
        const emailInput = this.view.form.querySelector('input[name=Email]');
        const emailValue = emailInput.value.trim();

        if (emailValue === '' || !this.isValidEmail(emailValue)) {
            this.handleValidationErrors([emailInput], 'Invalid email format');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateCardInput() {
        const creditCardInput = this.view.form.querySelector('input[name=CardNumber]');
        const creditCardValue = creditCardInput.value.trim().replace(/\s/g, ''); 

        if (!/^[0-9 ]*$/.test(creditCardValue)) {
            this.handleValidationErrors([creditCardInput], 'Credit card number must contain only numbers and spaces');
            return false;
        }

        const creditCardPattern = /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/;
        if (!creditCardPattern.test(creditCardValue)) {
            this.handleValidationErrors([creditCardInput], 'Invalid credit card number format');
            return false;
        }

        return true;
    }

    handleValidationErrors(inputs, errorMessage) {
        inputs.forEach(input => {
            input.classList.add('shake');
            input.style.borderColor = 'red';

            input.addEventListener('animationend', () => {
                input.classList.remove('shake');
                input.style.borderColor = ''; 
            }, { once: true });

            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.style.color = 'red';

            errorDiv.textContent = errorMessage;
            this.view.form.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        });
    }


}
