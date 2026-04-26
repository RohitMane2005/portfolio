// Portfolio filter
const pfBtns = document.querySelectorAll('.pf-btn');
const portItems = document.querySelectorAll('.port-item');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    portItems.forEach(item => {
      item.classList.toggle('hidden', cat !== 'all' && item.dataset.cat !== cat);
    });
  });
});

function handleContact(e) {
  e.preventDefault();
  document.getElementById('contact-msg').textContent = '✓ Enquiry sent! I\'ll be in touch within 24 hours.';
  e.target.reset();
}