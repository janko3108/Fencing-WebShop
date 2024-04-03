/**
 * Class that represents the application view. The view displays information 
 * contained in the model: type & color. The view does not obtain the information 
 * directly from the model, it uses the controller as a mediator which instructs 
 * it when and what to display. 
 * 
 * The view holds references to all UI elements with which the user interacts with
 * AND for which the event-handling mechanism needs to be implemented.
 */

export class ShopView {

    /**
     * Constructor creates attributes by getting them via querySelector from the html doc
     */
    constructor() {
        this.fencingForm = document.querySelector("#form-fencing");
        this.selectsDiv = document.querySelector("#div-selects");
        this.selects = null;
        this.fencingDiv = document.querySelector("#div-fencing");
        this.resetButton = document.querySelector("button[type=reset]");
        this.submitButton = document.querySelector("button[type=submit]");




        this.navDemo = document.getElementById("navDemo");
    }
    updateProgressBar(scrollPercentage) {
        document.getElementById("myBar").style.width = scrollPercentage + "%";
    }


    renderSelects(selectIDs) {
        selectIDs.forEach((selectID) => {
            let select = document.createElement('select');
            select.id = selectID;
            select.options.add(new Option(` -- Select a ${selectID} -- `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });
        this.selects = this.selectsDiv.querySelectorAll('select');
    }

    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - the ID of the select which next siblings are going to be reset
     */
    resetNextSiblings(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);

        // Check if the select element is found
        if (select) {
            let nextSelect = select.nextElementSibling;

            // Iterate over next siblings
            while (nextSelect) {
                console.log(nextSelect); // Add this line for debugging

                nextSelect.length = 1;
                nextSelect = nextSelect.nextElementSibling;
            }
        }
    }



    /**
     * Adds options to a select.
     * 
     * @param {String} selectID
     * @param {Array} options - array of strings (option names)
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.length = 1;
        options.forEach((option) => {
            select.options.add(new Option(option, option));
        });
    }

    /**
     * Renders the image based on the current selects' values.
     * 
     * @returns {undefined}
     */
    renderWeapon() {
        let imgSrc = 'assets/media/';

        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`;
            console.log(select.value);
        });
        imgSrc = imgSrc.slice(0, -1) + '.png'; //remove the last character '-'.

        this.fencingDiv.src = imgSrc;
    }


    resetImage() {
        this.fencingDiv.src = "assets/media/undefined-undefined-undefined.png";

    }

    /**
     * Code that came with the W3S template, it toggles the navigation for small screens
     */
    toggleNav() { //code that came with CSS template
        if (this.navDemo.className.indexOf("w3-show") == -1) {
            this.navDemo.className += " w3-show";
        } else {
            this.navDemo.className = this.navDemo.className.replace(" w3-show", "");
        }
    }
    // /**
    //  * Makes the submit button enabled/disabled based on option selection
    //  */
    // toggleSubmitButton() {
    //     if (this.typeWeapon.value !== "selectWeapon" && this.sizeWeapon.value !== "selectWeaponSize" && this.typeHandle.value !== "selectHandleType") {
    //         this.submitButton.disabled = false;
    //     }
    // }

    /**
     * Renders the image by getting the needed attributes, function is used in the controller
     * @param {*} weapon 
     * @param {*} size 
     * @param {*} handle 
     */
    // renderWeapon(weapon, size, handle) {
    //     let imgSrc = `assets/media/${weapon}-${size}-${handle}.png`;
    //     this.fencingImage.src = imgSrc;
    // }


    // /**
    //  * Resets all the values to default values and disables the button
    //  */
    // reset() {
    //     this.typeWeapon.value = "selectWeapon";
    //     this.sizeWeapon.value = "selectWeaponSize";
    //     this.typeHandle.value = "selectHandleType";
    //     this.submitButton.disabled = true;
    // }
}