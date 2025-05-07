// Основные скрипты для сайта о писателе Игоре Михайлове

document.addEventListener('DOMContentLoaded', function() {

    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    if (mobileMenuToggle && mainMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
        });
    }

    // Табы на странице книги
    const tabNavItems = document.querySelectorAll('.tab-nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabNavItems.length > 0 && tabPanes.length > 0) {
        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                // Удаляем активный класс у всех табов
                tabNavItems.forEach(tab => tab.classList.remove('active'));
                // Добавляем активный класс текущему табу
                this.classList.add('active');
                
                // Получаем ID таба
                const tabId = this.getAttribute('data-tab');
                
                // Скрываем все панели и показываем нужную
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.getAttribute('id') === tabId) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    // Галерея с лайтбоксом
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgCaption = this.querySelector('.gallery-caption') ? 
                                   this.querySelector('.gallery-caption').textContent : '';
                
                showLightbox(imgSrc, imgCaption);
            });
        });
    }

    // Функция для отображения лайтбокса
    function showLightbox(imgSrc, caption) {
        // Создаем элементы лайтбокса
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        // Добавляем подпись, если она есть
        if (caption) {
            const captionEl = document.createElement('div');
            captionEl.className = 'lightbox-caption';
            captionEl.textContent = caption;
            lightboxContent.appendChild(captionEl);
        }
        
        // Собираем элементы
        lightboxContent.appendChild(img);
        lightboxContent.appendChild(closeBtn);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Блокируем прокрутку
        document.body.style.overflow = 'hidden';
        
        // Плавно показываем лайтбокс
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Обработчик для закрытия
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Функция закрытия лайтбокса
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Анимация элементов при прокрутке
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        // Функция для проверки, виден ли элемент
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Функция для анимации видимых элементов
        function animateOnScroll() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Запускаем анимацию при загрузке и прокрутке
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }

    // Модальное окно для формы обратной связи
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    if (contactBtns.length > 0) {
        contactBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('contact-modal');
            });
        });
    }

    // Функция для отображения модального окна
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Закрытие модального окна
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                });
            }
            
            // Закрытие по клику вне содержимого
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Фильтры для галереи
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    
    if (galleryFilters.length > 0 && galleryItems.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');
                
                // Активный класс для фильтра
                galleryFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Фильтрация элементов
                galleryItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Наверх"
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Загрузка дополнительных элементов галереи
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Здесь будет код для добавления новых элементов галереи
            // В реальном проекте это может быть AJAX-запрос

            // Пример:
            const galleryContainer = document.querySelector('.gallery');
            if (galleryContainer) {
                // Добавление заглушки для демонстрации
                this.textContent = 'Загрузка...';
                setTimeout(() => {
                    // Эмуляция загрузки данных
                    this.textContent = 'Загрузить еще';
                    // Если все загружено, скрываем кнопку
                    //this.style.display = 'none';
                }, 1000);
            }
        });
    }
});