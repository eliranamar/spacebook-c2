var SpacebookApp = function () {
  var posts = [];
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    // debugger;
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      var commentsList = renderComments(post);
      var commentsContainer = '<div class="comments-container">' +
        commentsList +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>' +
        '<a href="#" class="remove">remove</a> ' +
        '<a href="#" class="show-comments">comments</a> ' +
        post.text +
        commentsContainer + '</div>');

    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    // console.log(id);
    var commentText = {
      text: $(currentPost).prev('.comment-name').val()
    }
    // console.log(commentText);
    var post = _findPostById(id);
    post.comments.push(commentText);
  }

  var renderComments = function (post) {
    var list = '';
    for (var i = 0; i < post.comments.length; i++) {
      list += '<p class="comment"><a href="#" class="remove-comment">remove</a> ' 
      + '<span>' + post.comments[i].text + "</span></p></br>";
    }
    return list;
  }

  var removeComment = function (aTag, spanText){
    var $clickedPost = $(aTag).closest('.post');
    var id = $clickedPost.data().id;
    for (var i = 0; i < posts.length; i++) {
      if (id === posts[i].id) {
        for (var j = 0; j < posts[i].comments.length; j++) {
          if (posts[i].comments[j].text == spanText) {
            posts[i].comments.splice(j,1);
            break;
          }
        }
        break;
      }
    }
    console.log(posts);
    // aTag.closest("p").remove();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  $('#post-name').val("");
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.createComment(this);
  app.renderPosts();
});

$('.posts').on('click', '.remove-comment', function () {
  var spanText = $(this).next('span').html();
  app.removeComment(this, spanText);
  app.renderPosts();
});