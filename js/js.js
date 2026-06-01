const languageButton = document.querySelector('.language-selector');
const languageWrapper = document.querySelector('.language-selector-wrapper');
const languageDropdown = document.querySelector('.language-dropdown');

if (languageButton && languageDropdown) {

    languageButton.addEventListener('click', function (e) {
        e.stopPropagation();

        languageDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function () {
        languageDropdown.classList.remove('active');
    });

    languageWrapper.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document
        .querySelectorAll('.language-option')
        .forEach(option => {
            option.addEventListener('click', () => {
                languageDropdown.classList.remove('active');
            });
        });
}