
var posts = [];

function addPostToArray(text, id) {
  posts.push({
    text: text,
    id: id
  });
}
function addPostsToHTML() {
  $('.posts').empty();
  for (var i = 0; i < posts.length; i++) {
    $('.posts').append('<div class="post-box"><p class="post bg-info text-center" data-id="' +
      posts[i].id +
      '"> <button type="button" class="remove float-left">REMOVE</button> ' +
      posts[i].text +
      '</p>' +
      '<h4>Comments:</h4>' +
      '<div class="comments-box">' +
      '</div>' +
      '<input type="text" id="comment-input" class="form-control" placeholder="Comment Here!">' +
      '<button class="add-comment btn-success" type="button"> + Comment</button></div>'
    );
  }
}
function removePostFromArray(postId) {
  for (var i = 0; i < posts.length; i++) {
    if (postId == posts[i].id) {
      posts.splice(i, 1);
      return;
    }
  }
}
//need to use data id to add comment!!!
function addCommentToPost(text) {
  $('.comments-box').append('<p class="comment">- ' +
    text +
    '  <button class="remove-comment btn-danger" type="button">Remove comment</button>' +
    '</p>'
  );
}
  

$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  var id = new Date().valueOf();
  console.log(text + id)
  if (!text) {
    alert("Please write a post")
  } else {
    addPostToArray(text, id);
    addPostsToHTML();
    $('#post-name').val("");
  }
});

$('body').on('click', '.remove', function () {
  var postId = $(this).closest("p").data().id;
  removePostFromArray(postId);
  addPostsToHTML();
});

$('.posts').on('click', '.add-comment', function () {
  var commentText = $(this).prev().val();
  console.log(commentText);
  if (!commentText) {
    alert('Write a comment first')
  } else {
    $('#comment-input').val("");
    addCommentToPost(commentText);
  }
});

$('.posts').on('click', '.remove-comment', function () {
  $(this).closest('p').remove();
});