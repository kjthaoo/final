const myFunction = () => {
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = `${scrolled}%`;
};

window.onscroll = myFunction;

document.addEventListener('DOMContentLoaded', function() {
  const commentList = document.getElementById('comment-list');
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const showCommentsBtn = document.getElementById('show-comments-btn');
  const commentSection = document.getElementById('comments');

  // load comments
  loadComments();

  // show comments button event listener
  showCommentsBtn.addEventListener('click', function() {
    // toggle comment section visibility
    if (commentSection.style.display === 'none') {
      commentSection.style.display = 'block';
      showCommentsBtn.textContent = 'Hide Comments';
    } else {
      commentSection.style.display = 'none';
      showCommentsBtn.textContent = 'Show Comments';
    }
  });

  // comment form submit event listener
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
      addComment(commentText);
      commentInput.value = '';
    }
  });

  // function to add a new comment
  function addComment(text) {
    const comment = document.createElement('li');
    comment.className = 'comment';
    comment.innerHTML = `<p>${text}</p><span class="delete-btn">Delete</span>`;
    commentList.appendChild(comment);

    // save comment
    saveComment(text);
  }

  // function to save comment
  function saveComment(comment) {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  // function to load comments
  function loadComments() {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    comments.forEach(comment => addComment(comment));
  }

  // event listener for delete button
  commentList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const comment = event.target.parentNode;
      commentList.removeChild(comment);
      removeComment(comment.querySelector('p').textContent);
    }
  });

  // function to remove comment
  function removeComment(commentText) {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    comments = comments.filter(comment => comment !== commentText);
    localStorage.setItem('comments', JSON.stringify(comments));
  }
});
