function handleAppt(e) {
  e.preventDefault();
  document.getElementById('appt-msg').textContent = '✓ Appointment request received! We\'ll confirm within 2 hours.';
  e.target.reset();
}
document.getElementById('hamburger')?.addEventListener('click', () => {
  const nl = document.querySelector('.nav-links');
  nl.style.display = nl.style.display === 'flex' ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'absolute';
  nl.style.top = '65px';
  nl.style.right = '1.5rem';
  nl.style.background = '#fff';
  nl.style.padding = '1rem 2rem';
  nl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
});