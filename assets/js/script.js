// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Countdown timer
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const weddingDate = new Date(countdownEl.dataset.weddingDate).getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  function updateCountdown() {
    const distance = weddingDate - Date.now();
    if (isNaN(weddingDate) || distance <= 0) {
      countdownEl.style.display = 'none';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((distance / (1000 * 60)) % 60);
    const secs = Math.floor((distance / 1000) % 60);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minsEl.textContent = mins;
    secsEl.textContent = secs;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// RSVP form: opens a pre-filled email as a zero-backend fallback.
// See README to swap this for Formspree or another form service.
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(rsvpForm);
    const events = data.getAll('events').join(', ') || 'None selected';

    const lines = [
      `Name: ${data.get('guestName')}`,
      `Email: ${data.get('guestEmail')}`,
      `Phone: ${data.get('guestPhone') || '-'}`,
      `Attending: ${data.get('attending') === 'yes' ? 'Yes' : 'No'}`,
      `Number of Guests: ${data.get('guestCount')}`,
      `Events: ${events}`,
      `Meal Preference: ${data.get('mealPref')}`,
      `Message: ${data.get('message') || '-'}`
    ];

    const subject = encodeURIComponent(`RSVP from ${data.get('guestName')}`);
    const body = encodeURIComponent(lines.join('\n'));
    // Replace with the couple's actual contact email.
    const rsvpEmail = 'REPLACE_WITH_YOUR_EMAIL@example.com';
    window.location.href = `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;
  });
}
