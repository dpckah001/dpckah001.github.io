// DedSec Random Glitch Enhancement
document.addEventListener('DOMContentLoaded', () => {
  const glitchElements = document.querySelectorAll('.glitch');
  
  // Randomly intensify glitch effect
  setInterval(() => {
    glitchElements.forEach(el => {
      if (Math.random() > 0.85) {
        el.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
        setTimeout(() => { el.style.transform = 'translate(0,0)'; }, 100);
      }
    });
  }, 2000);

  // Typing cursor effect for footer
  const statusEl = document.querySelector('.status-online');
  if (statusEl) {
    const originalText = statusEl.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    
    statusEl.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        statusEl.textContent = originalText.split('')
          .map((char, i) => i < iterations ? originalText[i] : chars[Math.floor(Math.random() * chars.length)])
          .join('');
        iterations += 1/3;
        if (iterations >= originalText.length) clearInterval(interval);
      }, 30);
    });
  }

  console.log('%c[DEDSEC] System initialized. Welcome, operative.', 
    'color: #ff0055; font-size: 14px; font-family: monospace;');
});
