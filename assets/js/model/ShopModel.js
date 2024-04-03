/**
 * Represents the application model. The model contains the data, the information 
 * regarding the animal such as: type and color. The model can obtain data either 
 * from a database or files, which could be located locally or externally. The 
 * model does not talk directly to a view, instead is made available to a controller 
 * which accesses it when needed. 
 */

import { selectData } from "../store/selectData.js";

export class ShopModel {
    static store = selectData;
    /**
     * Constructor for the attributes weaponType, weaponSize, and HandleType
     */
    constructor() {
        this.WeaponType = "undefined";
        this.WeaponSize = "undefined";
        this.HandleType = "undefined";
    }

    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        return Object.keys(this);
    }

    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - select ID
     * @returns {Array} array of select's options (strings)
     */
    getOptions(selectID) {
        // 1. extract the data from the external resource (AnimalModel.store).
        let options; // a JS object
        switch (selectID) {
            case 'WeaponType':
                options = Object.keys(ShopModel.store);
                break;
            case 'WeaponSize':
                options = Object.keys(ShopModel.store[this.WeaponType]);
                break;
            case 'HandleType':
                options = Object.keys(ShopModel.store[this.WeaponType][this.WeaponSize]);
                break;
        }

        // 2. return select options
        return options;
    }

    /**
     * Resets this object's properties to "undefined". Not all properties are
     * going to be reset, only those that are listed after the property defined 
     * by this method parameter. 
     * 
     * @param {type} property - property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    store() {
        localStorage.setItem("weapon", JSON.stringify(this));
        // console.log(localStorage.getItem("weapon"));
    }

    hasUndefinedProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);

        // Check for 'undefined' values in properties listed after the provided property
        while (++index < properties.length) {
            if (this[properties[index]] === 'undefined') {
                return true;
            }
        }

        return false;

    }

}
