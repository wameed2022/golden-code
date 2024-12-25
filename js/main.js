const dragImage = document.getElementById('drag-image');
const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');

let startX = 0;
let currentX = 0;
let isDragging = false;

// دوال مشتركة لإعادة الأيقونات
function resetIcons() {
    leftIcon.style.transform = 'translateX(-50px) scale(1)';
    rightIcon.style.transform = 'translateX(50px) scale(1)';
    leftIcon.style.opacity = '0.3';
    rightIcon.style.opacity = '0.3';
}

function goToPage(direction) {
    isDragging = false;

    if (direction === 'right') {
        window.location.href = 'day.html'; // صفحة النهار
    } else if (direction === 'left') {
        window.location.href = 'night.html'; // صفحة الليل
    }
}

// وظيفة لبدء السحب (ماوس أو لمس)
function startDrag(e) {
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    isDragging = true;

    // إظهار الأيقونات عند السحب
    leftIcon.style.opacity = '1';
    rightIcon.style.opacity = '1';
}

// وظيفة لتحريك الصورة (ماوس أو لمس)
function drag(e) {
    if (!isDragging) return;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX = clientX - startX;

    // تحريك الصورة
    dragImage.style.transform = `translateX(${currentX}px)`;

    // تأثير على الأيقونات أثناء السحب
    if (currentX > 50) {
        rightIcon.style.transform = `translateX(${currentX}px) scale(1.2)`;
        leftIcon.style.transform = 'translateX(-50px) scale(1)';
    } else if (currentX < -50) {
        leftIcon.style.transform = `translateX(${currentX}px) scale(1.2)`;
        rightIcon.style.transform = 'translateX(50px) scale(1)';
    } else {
        resetIcons();
    }

    // التحقق من اتجاه السحب
    if (currentX > 150) {
        goToPage('right');
    } else if (currentX < -150) {
        goToPage('left');
    }
}

// وظيفة لإنهاء السحب (ماوس أو لمس)
function endDrag() {
    isDragging = false;

    // إعادة الصورة إلى مكانها الأصلي
    dragImage.style.transform = 'translateX(0)';

    // إعادة الأيقونات إلى وضعها الطبيعي
    resetIcons();
}

// إضافة الأحداث للماوس
dragImage.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

// إضافة الأحداث للمس
dragImage.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', endDrag);
