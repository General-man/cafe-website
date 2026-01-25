// Frontend validation only
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!name || !email || !message) {
      alert('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Invalid email.');
      return;
    }
    alert('Form submitted (UI only).');
    form.reset();
  });
});
