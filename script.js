// ---- Hero slider: auto-advance every 2 seconds ----
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('dots');
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');

  function showSlide(i){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function goToSlide(i){ showSlide(i); resetTimer(); }
  function moveSlide(dir){ showSlide(current + dir); resetTimer(); }
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 2000);
  }
  resetTimer();

  const sliderEl = document.getElementById('slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
  sliderEl.addEventListener('mouseleave', resetTimer);

// ---- Product enquiry modal ----
const WHATSAPP_NUMBER = '918882892502'; // 91 = India code + your number
let currentProduct = '';

const modalOverlay = document.getElementById('modalOverlay');
const modalProductName = document.getElementById('modalProductName');
const modalFormView = document.getElementById('modalFormView');
const modalThanksView = document.getElementById('modalThanksView');
const enquiryForm = document.getElementById('enquiryForm');

function openModal(productName){
  currentProduct = productName;
  modalProductName.textContent = productName;
  modalFormView.style.display = 'block';
  modalThanksView.style.display = 'none';
  enquiryForm.reset();
  modalOverlay.classList.add('open');
}

function closeModal(){
  modalOverlay.classList.remove('open');
}

// Close modal when clicking outside the box
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

enquiryForm.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const number = document.getElementById('custNumber').value.trim();

  if(!name || !number) return;

  // Build the WhatsApp message with the customer's details
  const message = `Hi, I'm interested in *${currentProduct}*.%0AName: ${name}%0ANumber: ${number}`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  // Opens WhatsApp with the message pre-filled, sent straight to your number
  window.open(waLink, '_blank');

  // Show the thank-you message inside the modal
  modalFormView.style.display = 'none';
  modalThanksView.style.display = 'block';
});
