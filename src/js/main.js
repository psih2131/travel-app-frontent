import '../scss/main.scss'

import { initModals } from "./modals.js";

import { hideShowPassword } from "./helpers-scripts.js";

import { postSlider, guideSlider, reviewsSlider } from "./swiperSliders.js";

import { galeryTour } from "./galeryTour.js";

import { acordeon, funcyBox, acordeonProgram, tourReviewsAccordion } from "./tourPageScripst.js";

import { reviewCardTruncate } from "./reviewCardTruncate.js";

import { faqAccordion } from "./faqAccordion.js";

import { heroSearch } from "./heroSearch.js";

import { initBaseScripts, openMobileMenu } from "./base-scripts.js";

import { initUserAccountTabs } from "./user-account-scripts.js";

import { initTourCreateForm } from "./tourCreateForm.js";

import { initUserBookingReview } from "./userBookingPage.js";

import { initTourBookingPage } from "./tourBookingPage.js";


initModals();


//helpers
hideShowPassword()

openMobileMenu()

initBaseScripts()

postSlider()

galeryTour()

acordeon()

funcyBox()

acordeonProgram()

tourReviewsAccordion()

guideSlider()

reviewsSlider()

reviewCardTruncate()

faqAccordion()

heroSearch()


//user account
initUserAccountTabs()

initTourCreateForm()

initUserBookingReview()

initTourBookingPage()


