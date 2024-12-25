function openOrderForm() {
    document.getElementById("orderModal").style.display = "block";
}

function closeOrderForm() {
    document.getElementById("orderModal").style.display = "none";
}

function sendToWhatsapp() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;

    const message = `الاسم: ${name}\nالرقم: ${phone}\nنوع الخدمة: ${service}`;
    const whatsappLink = `https://wa.me/01111600093?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, "_blank");
}
