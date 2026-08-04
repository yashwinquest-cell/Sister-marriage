// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Countdown timer — automatically targets whichever event is coming up next.
// Add more entries here as dates for Mehendi, Haldi, Sangeet, Wedding and
// Reception get confirmed; the countdown switches to the next one once the
// current one passes.
const upcomingEvents = [
  { name: 'Ring Ceremony', date: '2026-08-31T18:00:00' }
];

const countdownEl = document.getElementById('countdown');
const countdownLabelEl = document.getElementById('countdownLabel');
if (countdownEl) {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  function getNextEvent() {
    const now = Date.now();
    return upcomingEvents
      .map(e => ({ ...e, time: new Date(e.date).getTime() }))
      .filter(e => !isNaN(e.time) && e.time > now)
      .sort((a, b) => a.time - b.time)[0];
  }

  function updateCountdown() {
    const next = getNextEvent();
    if (!next) {
      countdownEl.style.display = 'none';
      if (countdownLabelEl) countdownLabelEl.style.display = 'none';
      return;
    }
    if (countdownLabelEl) countdownLabelEl.textContent = `Counting down to ${next.name}`;
    const distance = next.time - Date.now();
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
