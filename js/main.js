const dragImage = document.getElementById('drag-image');
const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');

let startX = 0;
let currentX = 0;
let isDragging = false;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// إضافة الأحداث المناسبة بناءً على الجهاز
const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

dragImage.addEventListener(startEvent, (e) => {
    startX = isTouchDevice ? e.touches[0].clientX : e.clientX;
    isDragging = true;

    leftIcon.style.opacity = '1';
    rightIcon.style.opacity = '1';

    const onMove = (event) => {
        if (!isDragging) return;

        currentX = (isTouchDevice ? event.touches[0].clientX : event.clientX) - startX;

        // تحريك الصورة
        dragImage.style.transform = `translateX(${currentX}px)`;

        // تأثير على الأيقونات
        if (currentX > 50) {
            rightIcon.style.transform = `translateX(${currentX}px) scale(1.2)`;
            leftIcon.style.transform = 'translateX(-30px) scale(1)';
        } else if (currentX < -50) {
            leftIcon.style.transform = `translateX(${currentX}px) scale(1.2)`;
            rightIcon.style.transform = 'translateX(30px) scale(1)';
        } else {
            resetIcons();
        }

        // التحقق من اتجاه السحب
        if (currentX > 150) {
            goToPage('right');
        } else if (currentX < -150) {
            goToPage('left');
        }
    };

    const onEnd = () => {
        isDragging = false;

        // إعادة الصورة إلى مكانها
        dragImage.style.transition = 'transform 0.3s ease';
        dragImage.style.transform = 'translateX(0)';
        
        // إعادة الأيقونات
        resetIcons();

        document.removeEventListener(moveEvent, onMove);
        document.removeEventListener(endEvent, onEnd);
    };

    document.addEventListener(moveEvent, onMove);
    document.addEventListener(endEvent, onEnd);
});

function goToPage(direction) {
    isDragging = false;

    if (direction === 'right') {
        window.location.href = 'day.html'; // صفحة النهار
    } else if (direction === 'left') {
        window.location.href = 'night.html'; // صفحة الليل
    }
}

function resetIcons() {
    leftIcon.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    rightIcon.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    leftIcon.style.transform = 'translateX(-30px) scale(1)';
    rightIcon.style.transform = 'translateX(30px) scale(1)';
    leftIcon.style.opacity = '0.3';
    rightIcon.style.opacity = '0.3';
}
