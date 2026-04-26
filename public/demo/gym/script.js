function handleJoin(e) {
  e.preventDefault();
  document.getElementById('join-msg').textContent = '🎉 Free trial activated! Check your email for next steps.';
  e.target.reset();
}
document.getElementById('hamburger')?.addEventListener('click', () => {
  const nl = document.querySelector('.nav-links');
  nl.style.display = nl.style.display === 'flex' ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'absolute';
  nl.style.top = '60px';
  nl.style.right = '1.5rem';
  nl.style.background = '#111';
  nl.style.padding = '1rem 2rem';
});