import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import { Carousel } from "@fancyapps/ui/dist/carousel/";

import "@fancyapps/ui/dist/carousel/carousel.css";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

function galeryTour() {
    Fancybox.bind('[data-fancybox="gallery"]', {
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
export { galeryTour };