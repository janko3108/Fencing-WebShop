import { ShopView } from "./view/ShopView.js";
import { ShopController } from "./controller/ShopController.js";
import { ShopModel } from "./model/ShopModel.js";


import { FormController } from "./controller/FormController.js";
import { FormModel } from "./model/FormModel.js";
import { FormView } from "./view/FormView.js";


class App {
    constructor() {
        const url = window.location.href;
        const regex = /[a-z]+.html/;
        let page = null;
        if (url.match(regex) != null) {
             page = url.match(regex)[0];
        }
        switch (page) {
            case "index.html":
            default:
                new ShopController(new ShopModel(), new ShopView());
                break;
            case "form.html":
                new FormController(new FormModel(), new FormView());
                break;
        }


    }
}


const app = new App();

