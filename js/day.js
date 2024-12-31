// التعامل مع نموذج طلب الخدمة
const serviceRequestForm = document.querySelector("#serviceRequestModal form");
serviceRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;

    const message = `طلب خدمة من: ${name}\nالخدمة المطلوبة: ${service}\n\nيرجى الرد عبر الواتساب.`;

    // فتح رابط واتساب مع الرسالة المحضرة
    const whatsappUrl = `https://wa.me/201111600093?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // إغلاق النافذة المنبثقة بعد إرسال النموذج
    const serviceRequestModal = new bootstrap.Modal(document.getElementById("serviceRequestModal"));
    serviceRequestModal.hide();
});

// التعامل مع نموذج إضافة تعليق جديد
const addReviewForm = document.querySelector("#addReviewModal form");
addReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const reviewText = document.getElementById("reviewText").value;

    // إنشاء عنصر جديد للتعليق وإضافته إلى صفحة الآراء
    const reviewSection = document.querySelector("#reviews .row");
    const newReview = document.createElement("div");
    newReview.classList.add("col-md-4");
    newReview.innerHTML = `
        <p>${reviewText}</p>
        <p>- عميل جديد <span class="fas fa-user"></span></p>
    `;
    reviewSection.appendChild(newReview);

    // إغلاق النافذة المنبثقة بعد إضافة التعليق
    const addReviewModal = new bootstrap.Modal(document.getElementById("addReviewModal"));
    addReviewModal.hide();

    // مسح محتوى النص بعد الإرسال
    document.getElementById("reviewText").value = "";
});
