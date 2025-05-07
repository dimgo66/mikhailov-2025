/**
 * Основной JavaScript файл для сайта Игоря Михайлова
 */

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Анимации при прокрутке
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                if (element.classList.contains('fadeIn-trigger')) {
                    element.classList.add('fadeIn');
                } else if (element.classList.contains('slideInLeft-trigger')) {
                    element.classList.add('slideInLeft');
                } else if (element.classList.contains('slideInRight-trigger')) {
                    element.classList.add('slideInRight');
                }
            }
        });
    }
    
    // Проверяем при загрузке страницы
    if (animateElements.length > 0) {
        checkScroll();
        
        // И при прокрутке
        window.addEventListener('scroll', checkScroll);
    }
    
    // Интерактивная "книжная полка"
    const books = document.querySelectorAll('.book');
    
    books.forEach(book => {
        book.addEventListener('mouseenter', function() {
            this.style.zIndex = "10";
        });
        
        book.addEventListener('mouseleave', function() {
            this.style.zIndex = "1";
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Закрыть мобильное меню после клика
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Галерея изображений (если на странице есть галерея)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                // Создаем модальное окно для просмотра изображения
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                
                modal.innerHTML = `
                    <div class="gallery-modal-content">
                        <span class="gallery-modal-close">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <div class="gallery-modal-caption">${imgAlt}</div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Предотвращаем прокрутку страницы
                document.body.style.overflow = 'hidden';
                
                // Закрытие модального окна
                modal.querySelector('.gallery-modal-close').addEventListener('click', function() {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                });
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                        document.body.style.overflow = '';
                    }
                });
            });
        });
    }
    
    // Фиксированное меню при прокрутке
    const headerTop = document.querySelector('.header-top');
    const heroSection = document.querySelector('.hero-section');
    
    if (headerTop && heroSection) {
        function updateHeader() {
            if (window.scrollY > 100) {
                headerTop.classList.add('header-scrolled');
            } else {
                headerTop.classList.remove('header-scrolled');
            }
        }
        
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Проверяем сразу при загрузке
    }
    
    // Функция для отображения уведомления
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Обработка формы обратной связи (если она есть на странице)
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь будет код для отправки формы на сервер
            // Для примера просто показываем уведомление
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Сбрасываем форму
            contactForm.reset();
        });
    }
});

// Функция для загрузки изображений с эффектом появления
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback для браузеров без поддержки IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Запускаем загрузку изображений после полной загрузки страницы
window.addEventListener('load', lazyLoadImages);