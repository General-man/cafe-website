// Comments and reactions (UI only, local JS)
let comments = [];
let likes = 0;

function renderComments() {
  const container = document.getElementById('comment-list');
  container.innerHTML = comments.map(comment => `
    <div class="comment">
      <strong>${comment.name}:</strong> ${comment.text}
    </div>
  `).join('');
}

function renderLikes() {
  document.getElementById('like-count').textContent = likes;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('comment-form')) {
    document.getElementById('comment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('comment-name').value;
      const text = document.getElementById('comment-text').value;
      comments.push({ name, text });
      renderComments();
      e.target.reset();
    });
  }
  if (document.getElementById('like-btn')) {
    document.getElementById('like-btn').addEventListener('click', () => {
      likes++;
      renderLikes();
    });
  }
});
