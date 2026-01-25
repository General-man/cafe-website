// Global functions for reusable components
function loadNavbar() {
  const navbarHTML = `
    <div class="navbar">
      <div class="logo">TechBlog</div>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="blogs.html">Blogs</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
}

function loadFooter() {
  const footerHTML = `
    <footer class="footer">
      <p>&copy; 2023 TechBlog. <a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms</a></p>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Simple client-side routing (for single-page feel)
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  loadFooter();
  // Add mobile menu toggle if needed (extend as per requirement)
});
