const appRoot = document.getElementById('app-root');

// --- Component: Blog Card ---
const createBlogCard = (post) => `
    <article class="blog-card">
        <img src="${post.image}" alt="${post.title}" style="width:100%">
        <div class="card-content">
            <small>${post.category} | ${post.date}</small>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <button class="btn" onclick="renderSinglePost(${post.id})">Read More</button>
        </div>
    </article>
`;

// --- Page: Home ---
function renderHome() {
    appRoot.innerHTML = `
        <section class="hero">
            <div class="container">
                <h1>Insights for the Modern Developer</h1>
                <p>Tutorials, architecture, and tech culture.</p>
            </div>
        </section>
        <section class="container">
            <div class="blog-grid">
                ${BLOG_POSTS.slice(0, 3).map(post => createBlogCard(post)).join('')}
            </div>
        </section>
    `;
}

// --- Page: Single Blog Post ---
function renderSinglePost(id) {
    const post = BLOG_POSTS.find(p => p.id === id);
    appRoot.innerHTML = `
        <article class="container" style="max-width: 800px; padding: 60px 20px;">
            <header>
                <h1>${post.title}</h1>
                <p>${post.date} • 5 min read</p>
            </header>
            <img src="${post.image}" class="featured-img" style="width:100%; border-radius:12px; margin: 30px 0;">
            <div class="post-body">
                ${post.content}
            </div>
            <hr>
            <div class="comment-section">
                <h3>Comments</h3>
                <input type="text" id="comment-name" placeholder="Name">
                <textarea id="comment-text" placeholder="Add a comment..."></textarea>
                <button onclick="addComment()">Post Comment</button>
                <div id="comment-list"></div>
            </div>
        </article>
    `;
    window.scrollTo(0,0);
}

// --- Logic: Comments ---
function addComment() {
    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;
    if(!name || !text) return alert("Please fill fields");

    const list = document.getElementById('comment-list');
    const comment = `<div class="comment"><strong>${name}</strong>: ${text}</div>`;
    list.innerHTML += comment;
}

// Initialize the app
renderHome();
