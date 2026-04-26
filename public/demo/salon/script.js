function handleBook(e) {
  e.preventDefault();
  document.getElementById('book-msg').textContent = '✓ Booking confirmed! We\'ll call you to confirm your appointment.';
  e.target.reset();
}