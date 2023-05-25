/*
apexweb.ru
small lazy load library
how to use:
just set src attribute by placeholder and set data-src attribute in img tag and load library
example: <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij4KICA8cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiBmaWxsPSIjMzMzMzMzIj5hcGV4d2ViLnJ1PC90ZXh0PiAgIAo8L3N2Zz4=" data-src="./image.png" alt="">

*/


// Функция для проверки, находится ли элемент в области просмотра
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для загрузки изображения
function loadImage(element) {
    const src = element.getAttribute('data-src');
    if (src) {
        element.setAttribute('src', src);
        element.removeAttribute('data-src');
    }
}

// Функция для обработки события прокрутки страницы
function handleScroll() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    lazyImages.forEach((lazyImage) => {
        if (isInViewport(lazyImage)) {
            loadImage(lazyImage);
        }
    });
}

// Загрузить изображения, находящиеся в области просмотра сразу
document.addEventListener('DOMContentLoaded', () => {
    const initialLoadImages = document.querySelectorAll('img[data-src]');

    initialLoadImages.forEach((image) => {
        if (isInViewport(image)) {
            loadImage(image);
        }
    });
});

// Обработать событие прокрутки страницы
window.addEventListener('scroll', handleScroll);
