document.addEventListener('DOMContentLoaded', () => {
    // Открываем второй вопрос по умолчанию
    const secondFaq = document.querySelectorAll('.faq_section_faq')[1];
    if (secondFaq) {
        secondFaq.classList.add('active');
        const content = secondFaq.querySelector('.faq_content');
        const arrow = secondFaq.querySelector('.faqs_arrow');
        content.style.maxHeight = content.scrollHeight + 'px';
        arrow.style.transform = 'rotate(270deg)';
    }

    // Обработчики для всех вопросов
    document.querySelectorAll('.faq_header').forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.closest('.faq_section_faq');
            const content = faqItem.querySelector('.faq_content');
            const arrow = faqItem.querySelector('.faqs_arrow');

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.style.transform = 'rotate(270deg)';
            } else {
                content.style.maxHeight = 0;
                arrow.style.transform = 'rotate(90deg)';
            }

            // Закрываем другие вопросы
            document.querySelectorAll('.faq_section_faq').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq_content').style.maxHeight = 0;
                    item.querySelector('.faqs_arrow').style.transform = 'rotate(90deg)';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqSection = document.querySelector('.faq_section_faqs');

    // Создаем наблюдатель
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Добавляем класс для анимации
                    entry.target.classList.add('animate-fadeInUp');
                    // Останавливаем наблюдение после появления
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2, // Анимация начнется, когда 20% блока будет видно
        }
    );

    // Начинаем наблюдение за текстовым контентом
    if (faqSection) {
        observer.observe(faqSection);
    }
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

    const cardWidth = slides[0].offsetWidth + 27; // Ширина карточки + отступ

    function changeSlide(direction) {
        // Обновляем currentSlide с учетом зацикливания
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

        // Перемещаем контейнер с карточками
        const offset = -currentSlide * cardWidth;
        slidesContainer.style.transform = `translateX(${offset}px)`;
    }

    // Обработчики для кнопок "назад" и "вперед"
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            changeSlide(-1);
            resetAutoScroll();
        });
        nextButton.addEventListener('click', () => {
            changeSlide(1);
            resetAutoScroll();
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

    // Автоматическая прокрутка
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changeSlide(1); // Переход к следующему слайду
        }, 5000); // Интервал 5 секунд
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Сбрасываем интервал
        startAutoScroll(); // Запускаем заново
    }

    // Запускаем автоматическую прокрутку
    startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении мыши
    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновляем автоматическую прокрутку, когда мышь убирают
    slidesContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
});




document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideContainer = document.querySelector('.our_partners_section_container');
    const slides = document.querySelectorAll('.our_partners_section_card');
    const totalSlides = slides.length / 2; // Учитываем дублированные слайды

    if (!slideContainer) {
        console.error('Контейнер с карточками не найден!');
        return;
    }

    const cardWidth = slides[0].offsetWidth + 27; // Ширина карточки + отступ

    function changeSlide(direction) {
        // Обновляем currentSlide
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

        // Перемещаем контейнер с карточками
        const offset = -currentSlide * cardWidth;
        slideContainer.style.transition = 'transform 0.5s ease'; // Плавный переход
        slideContainer.style.transform = `translateX(${offset}px)`;

        // Если достигли конца дублированных слайдов, переходим к началу без анимации
        if (currentSlide === totalSlides - 1 && direction === 1) {
            setTimeout(() => {
                slideContainer.style.transition = 'none'; // Отключаем анимацию
                slideContainer.style.transform = `translateX(0)`;
                currentSlide = 0;
            }, 500); // Ждем завершения анимации
        }

        // Если достигли начала дублированных слайдов, переходим к концу без анимации
        if (currentSlide === 0 && direction === -1) {
            setTimeout(() => {
                slideContainer.style.transition = 'none'; // Отключаем анимацию
                slideContainer.style.transform = `translateX(${-(totalSlides - 1) * cardWidth}px)`;
                currentSlide = totalSlides - 1;
            }, 500); // Ждем завершения анимации
        }
    }

    // Обработчики для кнопок "назад" и "вперед"
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            changeSlide(-1);
            resetAutoScroll();
        });
        nextBtn.addEventListener('click', () => {
            changeSlide(1);
            resetAutoScroll();
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

    // Автоматическая прокрутка
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changeSlide(1); // Переход к следующему слайду
        }, 5000); // Интервал 5 секунд
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Сбрасываем интервал
        startAutoScroll(); // Запускаем заново
    }

    // Запускаем автоматическую прокрутку
    startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении мыши
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновляем автоматическую прокрутку, когда мышь убирают
    slideContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header_container');

    function handleScroll() {
        if (window.scrollY > 50) { 
            header.classList.add('scrolled'); 
        } else {
            header.classList.remove('scrolled'); 
        }
    }

    window.addEventListener('scroll', handleScroll);
})




document.addEventListener('DOMContentLoaded', () => {
    const aboutUsSections = document.querySelectorAll('.about_us_section_content_part');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        aboutUsSections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})


document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger_menu');
    const headerNav = document.querySelector('.header_nav');
    const headerButton = document.querySelector('.header_button');

    burgerMenu.addEventListener('click', () => {
        headerNav.classList.toggle('active');
        headerButton.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.querySelector('.our_projects_animation');

    // Создаем наблюдатель
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Добавляем класс для анимации
                    entry.target.classList.add('animate-fadeInUp');
                    // Останавливаем наблюдение после появления
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2, // Анимация начнется, когда 20% блока будет видно
        }
    );

    // Начинаем наблюдение за блоком
    if (projectsSection) {
        observer.observe(projectsSection);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    let cSlide = 0;
    const prevClick = document.getElementById('prevClick');
    const nextClick = document.getElementById('nextClick');
    const slideContent = document.querySelector('.our_projects_cards');
    const slid = document.querySelectorAll('.our_projects_card');
    const totalSlid = slid.length;

    if (!slideContent) {
        console.error('Контейнер с карточками не найден!');
        return;
    }

    const cardWidth = slid[0].offsetWidth + 40; // Ширина карточки + отступ

    function changSlidee(direction) {
        cSlide += direction;

        // Зацикливание слайдов
        if (cSlide < 0) {
            cSlide = totalSlid - 1; // Переход к последнему слайду
            slideContent.style.transition = 'none'; // Отключаем анимацию
            slideContent.style.transform = `translateX(${-(totalSlid - 1) * cardWidth}px)`;
            setTimeout(() => {
                slideContent.style.transition = 'transform 0.2s ease'; // Включаем анимацию
                cSlide = totalSlid - 1;
            }, 10);
        } else if (cSlide >= totalSlid) {
            cSlide = 0; // Переход к первому слайду
            slideContent.style.transition = 'none'; // Отключаем анимацию
            slideContent.style.transform = `translateX(0)`;
            setTimeout(() => {
                slideContent.style.transition = 'transform 0.2s ease'; // Включаем анимацию
                cSlide = 0;
            }, 10);
            return;
        }

        const offset = -cSlide * cardWidth;
        slideContent.style.transform = `translateX(${offset}px)`;
    }

    // Обработчики для кнопок "назад" и "вперед"
    if (prevClick && nextClick) {
        prevClick.addEventListener('click', () => {
            changSlidee(-1);
            resetAutoScroll();
        });
        nextClick.addEventListener('click', () => {
            changSlidee(1);
            resetAutoScroll();
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

    // Автоматическая прокрутка
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changSlidee(1); // Переход к следующему слайду
        }, 3000); // Интервал 5 секунд
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Сбрасываем интервал
        startAutoScroll(); // Запускаем заново
    }

    // Запускаем автоматическую прокрутку
    startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении мыши
    slideContent.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Возобновляем автоматическую прокрутку, когда мышь убирают
    slideContent.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.our_projects_filter a');
    const cards = document.querySelectorAll('.our_projects_card');

    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

            
            filterLinks.forEach(link => link.classList.remove('active'));

          
            link.classList.add('active');

           
            const filter = link.getAttribute('data-filter');

            // Фильтруем карточки
            cards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block'; // Показываем карточку
                } else {
                    card.style.display = 'none'; // Скрываем карточку
                }
            });
        });
    });

    
    filterLinks[0].click(); 
})

document.addEventListener('DOMContentLoaded', function () {
    // Находим все ссылки
    const links = document.querySelectorAll('.our_projects_filter_link a');

    // Добавляем обработчик клика для каждой ссылки
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки

            // Убираем класс active у всех ссылок и соответствующих div
            links.forEach(otherLink => {
                otherLink.classList.remove('active');
                const otherDiv = otherLink.parentElement.querySelector('div');
                otherDiv.classList.remove('active');
            });

            // Добавляем класс active к текущей ссылке и соответствующему div
            this.classList.add('active');
            const currentDiv = this.parentElement.querySelector('div');
            currentDiv.classList.add('active');
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const headerBanner = document.querySelector('.header_banner');
    const backgroundZoom = document.querySelector('.background_zoom'); // Новый элемент
    const progress = document.querySelector('.slider_progress');
    const indicators = document.querySelectorAll('.slider_indicators .indicator');

    const images = [
        'url(assets/media/banner/banner.png)',
        'url(assets/media/banner/banner.png)',
        'url(assets/media/banner/banner.png)'
    ];

    let currentIndex = 0;

    // Функция для обновления слайдера
    function updateSlider(index) {
        // Меняем фоновое изображение через .background_zoom
        backgroundZoom.style.backgroundImage = images[index];

        // Обновляем полосу прогресса
        const progressWidth = ((index + 1) / images.length) * 100;
        progress.style.width = `${progressWidth}%`;

        // Обновляем индикаторы
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    // Переключение по индикаторам
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });

    // Автоматическое переключение слайдов
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider(currentIndex);
    }, 5000); // Интервал 5 секунд

    // Инициализация первого слайда
    updateSlider(currentIndex);
});