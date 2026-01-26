import { slideUp, slideDown, slideToggle } from "./libs/toggleAnim";

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

function acordeon() {
    let orgDetAcordeon = document.querySelectorAll('.org-det__element')

    if (orgDetAcordeon?.length > 0) {
        orgDetAcordeon.forEach(el => {

            el.querySelector('.org-det__element-header').addEventListener('click', function () {
                slideToggle(el.querySelector('.org-det__element-body'));
                console.log('gg')
            })

        })
    }

}

function acordeonProgram() {
    let orgDetAcordeon = document.querySelectorAll('.program-tour__acordeon')

    if (orgDetAcordeon?.length > 0) {
        orgDetAcordeon.forEach(el => {

            el.querySelector('.program-tour__acordeon-header').addEventListener('click', function () {
                slideToggle(el.querySelector('.program-tour__acordeon-body'));
                console.log('gg')
            })

        })
    }

}

function funcyBox() {
    Fancybox.bind('[data-fancybox]', {
        theme: "light",
        mainStyle: {
            "--f-toolbar-padding": "16px 32px",
            "--f-toolbar-gap": "8px",
            "--f-button-border-radius": "50%",
            "--f-thumb-width": "82px",
            "--f-thumb-height": "82px",
            "--f-thumb-opacity": "0.5",
            "--f-thumb-hover-opacity": "1",
            "--f-thumb-selected-opacity": "1",
        },
        Carousel: {
            Toolbar: {
                display: {
                    right: ["toggleFull", "close"],
                },
            },
        },
    });
}
export { acordeon, funcyBox, acordeonProgram }

