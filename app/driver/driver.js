import { driver } from "driver.js";
import "./OverrideDriver.css";

export const driverInstance = () => {
    const driverObj = driver();
    driverObj.setConfig({
        showProgress: true,
        progressText: "{{current}} de {{total}}",
        prevBtnText: "< Anterior",
        nextBtnText: "Próximo >",
        doneBtnText: "Fim",
        steps: [
            {
                element: "#more-like-this",
                popover: {
                    title: "Campos de busca",
                    description: "Aqui você pode pesquisar",
                    popoverClass: "driverjs-theme",
                },
            },
            {
                element: "#more-like-this",
                popover: {
                    title: "Campos de busca 2",
                    description: "Aqui você pode pesquisar",
                    popoverClass: "driverjs-theme",
                },
            },
            {
                element: "#more-like-this",
                popover: {
                    title: "Campos de busca",
                    description: "Aqui você pode pesquisar",
                    popoverClass: "driverjs-theme",
                },
            },
            {
                element: "#more-like-this",
                popover: {
                    title: "Campos de busca",
                    description: "Aqui você pode pesquisar",
                    popoverClass: "driverjs-theme",
                },
            },
        ],
    });
    driverObj.drive();
};

