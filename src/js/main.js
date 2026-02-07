import '../scss/main.scss'

import { postSlider, guideSlider, reviewsSlider } from "./swiperSliders.js";

import { galeryTour } from "./galeryTour.js";

import { acordeon, funcyBox, acordeonProgram } from "./tourPageScripst.js";

import { reviewCardTruncate } from "./reviewCardTruncate.js";
import { faqAccordion } from "./faqAccordion.js";
import { heroSearch } from "./heroSearch.js";
import { initBaseScripts } from "./base-scripts.js";

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
