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

    const cardWidth = slides[0].offsetWidth + 27; 

    function changeSlide(direction) {
        
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

        const offset = -currentSlide * cardWidth;
        slidesContainer.style.transform = `translateX(${offset}px)`;
    }

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

    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changeSlide(1); 
        }, 5000); 
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); 
        startAutoScroll(); 
    }

    startAutoScroll();

    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

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

    const cardWidths = slide[0].offsetWidth + 27;

    function changSlide(direction) {
        
        curntSlide = (curntSlide + direction + totalSlide) % totalSlide;
        const offset = -curntSlide * cardWidths;
        slideContainer.style.transform = `translateX(${offset}px)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            changSlide(-1);
            resetAutoScroll(); 
        });
        nextBtn.addEventListener('click', () => {
            changSlide(1);
            resetAutoScroll(); 
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }

   
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changSlide(1); 
        }, 5000); 
    }
    function resetAutoScroll() {
        clearInterval(autoScrollInterval); 
        startAutoScroll(); 
    }

    startAutoScroll();
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

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

    const cardWidth = slid[0].offsetWidth + 40;

    const maxOffset = -(totalSlid - 1) * cardWidth;

    function changSlidee(direction) {
        cSlide += direction;

        if (cSlide < 0) {
            cSlide = 0;
        } else if (cSlide >= totalSlid) {
            cSlide = 0; 
            slideContent.style.transition = 'none'; 
            slideContent.style.transform = `translateX(0)`;
            setTimeout(() => {
                slideContent.style.transition = 'transform 0.5s ease';
            }, 10);
            return;
        }

        const offset = -cSlide * cardWidth;
        slideContent.style.transform = `translateX(${offset}px)`;
    }

    if (prevClick && nextClick) {
        prevClick.addEventListener('click', () => {
            changSlidee(-1);
        });
        nextClick.addEventListener('click', () => {
            changSlidee(1);
        });
    } else {
        console.error('Кнопки "назад" или "вперед" не найдены!');
    }
})



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