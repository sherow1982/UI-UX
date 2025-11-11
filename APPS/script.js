// قائمة التنقل المتجاوبة
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// إغلاق القائمة عند النقر على رابط
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// تفعيل الرابط النشط حسب التمرير
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.15)';
        } else {
            navbar.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
        }
    }
});

// معالجة نموذج الاتصال
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // إرسال البيانات عبر واتساب
        const pageTitle = document.title;
        const pageURL = window.location.href;
        const whatsappMessage = `مرحباً، أنا *${name}*%0A%0A` +
                               `البريد الإلكتروني: ${email}%0A%0A` +
                               `الرسالة:%0A${message}%0A%0A` +
                               `----%0A` +
                               `تم الإرسال من صفحة: ${pageTitle}%0A` +
                               `الرابط: ${pageURL}`;
        
        window.open(`https://wa.me/201110760081?text=${whatsappMessage}`, '_blank');
        contactForm.reset();
    });
}

// تحسين زر الواتساب ليسحب بيانات الصفحة
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    // الاحتفاظ برابط الواتساب الأصلي إذا لم يكن يحتوي على text parameter
    if (!link.href.includes('text=')) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageTitle = document.title;
            const pageURL = window.location.href;
            const referrer = document.referrer || 'زيارة مباشرة';
            const userAgent = navigator.userAgent;
            const screenSize = `${window.screen.width}x${window.screen.height}`;
            const browserLang = navigator.language || navigator.userLanguage;
            
            const whatsappMessage = `مرحباً، %0A%0A` +
                                   `أريد الاستفسار عن خدماتكم%0A%0A` +
                                   `----%0A` +
                                   `*بيانات الصفحة:*%0A` +
                                   `▪️ عنوان الصفحة: ${pageTitle}%0A` +
                                   `▪️ الرابط: ${pageURL}%0A` +
                                   `▪️ مصدر الزيارة: ${referrer}%0A` +
                                   `▪️ حجم الشاشة: ${screenSize}%0A` +
                                   `▪️ لغة المتصفح: ${browserLang}`;
            
            const whatsappNumber = this.href.match(/\d+/)[0];
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        });
    }
});

// تأثيرات الحركة عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// تحميل سلس للصفحة
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🎨 تم تحميل تطبيق APPS بنجاح!');
console.log('💡 تصميم UI/UX عصري ومتجاوب مع دعم PWA');
