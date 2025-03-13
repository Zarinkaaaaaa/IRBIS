document.querySelectorAll('.faq_header').forEach(header => {
    header.addEventListener('click', () => {
        // Находим родительский элемент .faq_section_faq
        const faqItem = header.closest('.faq_section_faq');
        // Находим блок с контентом
        const content = faqItem.querySelector('.faq_content');
        // Находим стрелку
        const arrow = faqItem.querySelector('.faqs_arrow');

        // Переключаем класс active
        faqItem.classList.toggle('active');

        // Открываем или закрываем контент
        if (faqItem.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            arrow.style.transform = 'rotate(270deg)';
        } else {
            content.style.maxHeight = 0;
            arrow.style.transform = 'rotate(90deg)';
        }

        // Закрываем другие открытые элементы
        document.querySelectorAll('.faq_section_faq').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.faq_content').style.maxHeight = 0;
                item.querySelector('.faqs_arrow').style.transform = 'rotate(90deg)';
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const slidesContainer = document.querySelector('.reviews_section_slider_cards_container');
    const slides = document.querySelectorAll('.reviews_section_slider_card');
    const totalSlides = slides.length;

    if (!slidesContainer) {
        console.error('Контейнер с карточками не найден!');
        return;
    }

    const cardWidth = slides[0].offsetWidth + 27; // Ширина карточки + gap

    function changeSlide(direction) {
        // Обновляем индекс текущего слайда
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

        // Вычисляем смещение для контейнера
        const offset = -currentSlide * cardWidth;
        slidesContainer.style.transform = `translateX(${offset}px)`;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            changeSlide(-1);
            resetAutoScroll(); // Сбрасываем автоматическую прокрутку при клике
        });
        nextButton.addEventListener('click', () => {
            changeSlide(1);
            resetAutoScroll(); // Сбрасываем автоматическую прокрутку при клике
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

    // Функция для автоматической прокрутки
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changeSlide(1); // Переход к следующему слайду
        }, 5000); // Интервал 5 секунд
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Останавливаем текущий интервал
        startAutoScroll(); // Запускаем новый интервал
    }

    // Запускаем автоматическую прокрутку при загрузке страницы
    startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении на слайдер
    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновляем автоматическую прокрутку, когда курсор убирают
    slidesContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
});




document.addEventListener('DOMContentLoaded', () => {
    let curntSlide = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideContainer = document.querySelector('.our_partners_section_container');
    const slide = document.querySelectorAll('.our_partners_section_card');
    const totalSlide = slide.length;

    if (!slideContainer) {
        console.error('Контейнер с карточками не найден!');
        return;
    }

    const cardWidths = slide[0].offsetWidth + 27; // Ширина карточки + gap

    function changSlide(direction) {
        // Обновляем индекс текущего слайда
        curntSlide = (curntSlide + direction + totalSlide) % totalSlide;

        // Вычисляем смещение для контейнера
        const offset = -curntSlide * cardWidths;
        slideContainer.style.transform = `translateX(${offset}px)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            changSlide(-1);
            resetAutoScroll(); // Сбрасываем автоматическую прокрутку при клике
        });
        nextBtn.addEventListener('click', () => {
            changSlide(1);
            resetAutoScroll(); // Сбрасываем автоматическую прокрутку при клике
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

    // Функция для автоматической прокрутки
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changSlide(1); // Переход к следующему слайду
        }, 5000); // Интервал 5 секунд
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Останавливаем текущий интервал
        startAutoScroll(); // Запускаем новый интервал
    }

    // Запускаем автоматическую прокрутку при загрузке страницы
    startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении на слайдер
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновляем автоматическую прокрутку, когда курсор убирают
    slideContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header_container');

    // Функция для проверки прокрутки
    function handleScroll() {
        if (window.scrollY > 50) { // Если прокрутка больше 50px
            header.classList.add('scrolled'); // Добавляем класс с фоном
        } else {
            header.classList.remove('scrolled'); // Убираем класс с фоном
        }
    }

    // Слушаем событие прокрутки
    window.addEventListener('scroll', handleScroll);
});




document.addEventListener('DOMContentLoaded', () => {
    const aboutUsSections = document.querySelectorAll('.about_us_section_content_part');

    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Функция для обработки прокрутки
    function handleScroll() {
        aboutUsSections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible'); // Добавляем класс для анимации
            }
        });
    }

    // Слушаем событие прокрутки
    window.addEventListener('scroll', handleScroll);

    // Вызываем handleScroll при загрузке страницы, чтобы проверить видимость блоков
    handleScroll();
});


document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger_menu');
    const headerNav = document.querySelector('.header_nav');
    const headerButton = document.querySelector('.header_button');

    burgerMenu.addEventListener('click', () => {
        headerNav.classList.toggle('active');
        headerButton.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });
});