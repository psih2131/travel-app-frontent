import '../scss/main.scss'

import { popup } from 'engram-popup';

import 'engram-popup/dist/index.css';

import { hideShowPassword } from "./helpers-scripts.js";

import { postSlider, guideSlider, reviewsSlider } from "./swiperSliders.js";

import { galeryTour } from "./galeryTour.js";

import { acordeon, funcyBox, acordeonProgram } from "./tourPageScripst.js";

import { reviewCardTruncate } from "./reviewCardTruncate.js";

import { faqAccordion } from "./faqAccordion.js";

import { heroSearch } from "./heroSearch.js";

import { initBaseScripts } from "./base-scripts.js";

import { initUserAccountTabs } from "./user-account-scripts.js";


window.popupApi = popup(true, 'dark');


//helpers
hideShowPassword()

initBaseScripts()

postSlider()

galeryTour()

acordeon()

funcyBox()

acordeonProgram()

guideSlider()

reviewsSlider()

reviewCardTruncate()

faqAccordion()

heroSearch()


//user account
initUserAccountTabs()


