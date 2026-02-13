function initUserAccountTabs() {
    let allTabs = document.querySelectorAll('.user-profile-card__tab');
    let allTabContents = document.querySelectorAll('.user-account__tab-content');

    if (allTabs.length > 0) {
        allTabs[0].classList.add('user-profile-card__tab--active');
        allTabContents[0].classList.add('user-account__tab-content--active');

        for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].addEventListener('click', () => {
                console.log('click');
                allTabs.forEach(tab => {
                    tab.classList.remove('user-profile-card__tab--active');
                });

                allTabContents.forEach(tabElement => {
                    tabElement.classList.remove('user-account__tab-content--active');
                });

                allTabContents[i].classList.add('user-account__tab-content--active');
                allTabs[i].classList.add('user-profile-card__tab--active');
            });

            
        }
    }
}

export { initUserAccountTabs };
