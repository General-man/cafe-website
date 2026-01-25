// Load blogs from JSON
async function loadBlogs() {
  const response = await fetch('data/blogs.json');
  const blogs = await response.json();
  return blogs;
}

// Render blog cards
function renderBlogCards(blogs, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = blogs.map(blog => `
    <div class="blog-card">
      <img src="${blog.image}" alt="${blog.title}">
      <h3>${blog.title}</h3>
      <p>${blog.description}</p>
      <a href="blog.html?id=${blog.id}" class="read-more">Read More</a>
    </div>
  `).join('');
}

// For blog listing page
if (window.location.pathname.includes('blogs.html')) {
  loadBlogs().then(blogs => {
    renderBlogCards(blogs, 'blog-list');
    // Pagination: Load more (simple example)
    let visibleBlogs = 3;
    document.getElementById('load-more').addEventListener('click', () => {
      visibleBlogs += 3;
      renderBlogCards(blogs.slice(0, visibleBlogs), 'blog-list');
    });
  });
}

// For single blog page
if (window.location.pathname.includes('blog.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = parseInt(urlParams.get('id'));
  loadBlogs().then(blogs => {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
      document.getElementById('blog-title').textContent = blog.title;
      document.getElementById('blog-image').src = blog.image;
      document.getElementById('blog-content').innerHTML = blog.content;
    }
  });
}
