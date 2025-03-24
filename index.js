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

    // Ширина карточки + отступ (gap)
    const cardWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slidesContainer).gap);
    console.log('Ширина карточки + отступ:', cardWidth);

    function changeSlide(direction) {
        // Обновляем currentSlide с учетом зацикливания
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

        // Перемещаем контейнер с карточками
        const offset = -currentSlide * cardWidth;
        slidesContainer.style.transform = `translateX(${offset}px)`;
        console.log('Текущий слайд:', currentSlide, 'Смещение:', offset);
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
    // Ждем загрузки всех изображений
    const images = Array.from(document.querySelectorAll('.our_projects_card img'));
    const imagePromises = images.map(img => {
        return img.complete ? Promise.resolve() : new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
        });
    });

    Promise.all(imagePromises).then(initSlider);

    function initSlider() {
        let currentSlide = 0;
        const prevButton = document.getElementById('prevClick');
        const nextButton = document.getElementById('nextClick');
        const slidesContainer = document.querySelector('.our_projects_cards');
        const slides = document.querySelectorAll('.our_projects_card');
        const totalSlides = slides.length;

        if (!slidesContainer || slides.length === 0) return;

        // Расчет ширины с учетом всех отступов
        let cardWidth;
        function calculateCardWidth() {
            const slide = slides[0];
            const style = window.getComputedStyle(slide);
            cardWidth = slide.offsetWidth + 
                       parseInt(style.marginLeft) + 
                       parseInt(style.marginRight) +
                       parseInt(window.getComputedStyle(slidesContainer).gap);
        }

        calculateCardWidth();
        window.addEventListener('resize', calculateCardWidth);

        // Плавное переключение с requestAnimationFrame
        function smoothChangeSlide(direction) {
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            const offset = -currentSlide * cardWidth;
            
            // Анимация с двойным requestAnimationFrame
            requestAnimationFrame(() => {
                slidesContainer.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                slidesContainer.style.transform = `translateX(${offset}px)`;
            });
        }

        // Обработчики с debounce
        let isAnimating = false;
        function handleNavigation(direction) {
            if (isAnimating) return;
            isAnimating = true;
            
            smoothChangeSlide(direction);
            resetAutoScroll();
            
            setTimeout(() => {
                isAnimating = false;
            }, 700); // Соответствует длительности анимации
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => handleNavigation(-1));
            nextButton.addEventListener('click', () => handleNavigation(1));
        }

        // Автопрокрутка
        let autoScrollInterval;
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                handleNavigation(1);
            }, 5000);
        }
        
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }

        // Управление автопрокруткой
        slidesContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        slidesContainer.addEventListener('mouseleave', startAutoScroll);

        // Инициализация
        startAutoScroll();
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = 'translateX(0)';
        
        // Принудительное обновление после небольшой задержки
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.our_projects_filter a');
    const cards = document.querySelectorAll('.our_projects_card');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Убираем активный класс у всех ссылок
            filterLinks.forEach(link => link.classList.remove('active'));

            // Добавляем активный класс к текущей ссылке
            link.classList.add('active');

            // Получаем значение фильтра
            const filter = link.getAttribute('data-filter');

            // Фильтруем карточки
            cards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.visibility = 'visible'; // Показываем карточку
                    card.style.opacity = '1';
                } else {
                    card.style.visibility = 'hidden'; // Скрываем карточку
                    card.style.opacity = '0';
                }
            });
        });
    });

    // Активируем первую ссылку по умолчанию
    filterLinks[0].click();
});

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



document.addEventListener('DOMContentLoaded', function() {
    const headerBanner = document.querySelector('.header_banner');
    const backgroundZoom = document.querySelector('.background_zoom');
    const progress = document.querySelector('.slider_progress');
    const indicators = document.querySelectorAll('.slider_indicators .indicator');
    const sliderTrack = document.querySelector('.slider');

    const images = [
        'url(assets/media/banner/banner.png)',
        'url(assets/media/banner/banner.png)',
        'url(assets/media/banner/banner.png)'
    ];

    let currentIndex = 0;
    let isDragging = false;
    let startPosX = 0;
    let autoScrollInterval;
    let zoomInterval;
    let isHovered = false;

    // Функция для обновления слайдера
    function updateSlider(index) {
        currentIndex = (index + images.length) % images.length;
        
        backgroundZoom.style.backgroundImage = images[currentIndex];
        progress.style.width = `${((currentIndex + 1) / images.length) * 100}%`;
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
        
        // Запускаем анимацию приближения для нового слайда
        triggerZoomAnimation();
    }

    // Автоматическое приближение/отдаление
    function triggerZoomAnimation() {
        clearInterval(zoomInterval);
        
        if (!isHovered) {
            let isZoomed = false;
            
            zoomInterval = setInterval(() => {
                backgroundZoom.style.transform = isZoomed ? 'scale(1.05)' : 'scale(1)';
                isZoomed = !isZoomed;
            }, 2000); // Смена каждые 5 секунд
        }
    }

    // Обработчики для перетаскивания
    sliderTrack.addEventListener('mousedown', dragStart);
    sliderTrack.addEventListener('touchstart', dragStart);
    sliderTrack.addEventListener('mouseup', dragEnd);
    sliderTrack.addEventListener('touchend', dragEnd);
    sliderTrack.addEventListener('mouseleave', dragEnd);
    sliderTrack.addEventListener('mousemove', drag);
    sliderTrack.addEventListener('touchmove', drag);

    function dragStart(e) {
        e.preventDefault();
        isDragging = true;
        startPosX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        clearInterval(autoScrollInterval);
        clearInterval(zoomInterval);
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentPosition = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const diff = currentPosition - startPosX;
        
        if (Math.abs(diff) > 50) {
            updateSlider(diff > 0 ? currentIndex - 1 : currentIndex + 1);
            startPosX = currentPosition;
        }
    }

    function dragEnd() {
        isDragging = false;
        startAutoScroll();
        if (!isHovered) triggerZoomAnimation();
    }

    // Обработчики наведения мыши
    headerBanner.addEventListener('mouseenter', () => {
        isHovered = true;
        clearInterval(zoomInterval);
        backgroundZoom.style.transform = 'scale(1.05)';
        clearInterval(autoScrollInterval);
    });

    headerBanner.addEventListener('mouseleave', () => {
        isHovered = false;
        backgroundZoom.style.transform = 'scale(1)';
        triggerZoomAnimation();
        startAutoScroll();
    });

    // Переключение по индикаторам
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoScrollInterval);
            clearInterval(zoomInterval);
            updateSlider(index);
            startAutoScroll();
            if (!isHovered) triggerZoomAnimation();
        });
    });

    // Автоматическое переключение слайдов
    function startAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 5000);
    }

    // Инициализация
    updateSlider(currentIndex);
    startAutoScroll();
    triggerZoomAnimation();
});


document.addEventListener('DOMContentLoaded', () => {
    const seeMoreButtons = document.querySelectorAll('.see_more_btn');

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.reviews_section_slider_card');
            const shortText = card.querySelector('.reviews_content');
            const fullText = card.querySelector('.reviews_content_full');

            if (fullText.classList.contains('visible')) {

                fullText.style.maxHeight = '0';
                fullText.classList.remove('visible');
                shortText.style.display = 'block';
                button.textContent = 'see more';
            } else {

                fullText.style.display = 'block';
                fullText.style.maxHeight = fullText.scrollHeight + 'px'; // Плавное раскрытие
                fullText.classList.add('visible');
                shortText.style.display = 'none';
                button.textContent = 'see less';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.our_projects_card');

    // Обработчик для кнопок на карточках
    projectCards.forEach(card => {
        const btn = card.querySelector('button');
        const img = card.querySelector('img');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.src = img.src;
            modal.classList.add('active');
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Закрытие по клику на оверлей
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});