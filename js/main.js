const dragImage = document.getElementById('drag-image');
const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');

let startX = 0;
let currentX = 0;
let isDragging = false;

dragImage.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;

    // عند السحب: إظهار الأيقونات
    leftIcon.style.opacity = '1';
    rightIcon.style.opacity = '1';

    const onMouseMove = (event) => {
        if (!isDragging) return;

        currentX = event.clientX - startX;

        // تحريك الصورة
        dragImage.style.transform = `translateX(${currentX}px)`;

        // التأثير على الأيقونات أثناء السحب
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

    const onMouseUp = () => {
        isDragging = false;

        // إعادة الصورة إلى مكانها الأصلي
        dragImage.style.transform = 'translateX(0)';

        // إعادة الأيقونات إلى وضعها الطبيعي
        resetIcons();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
    leftIcon.style.transform = 'translateX(-30px) scale(1)';
    rightIcon.style.transform = 'translateX(30px) scale(1)';
    leftIcon.style.opacity = '0.3';
    rightIcon.style.opacity = '0.3';
}
