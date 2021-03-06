{
  // create post using AJAX
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDom(data.data.post);
          console.log(data);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(".delete-post-button", newPost));
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create post in dom
  let newPostDom = (post) => {
    console.log("My ost " + post);
    return $(`<li id="post-${post._id}">
        <p>
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post.id}">
              Delete
            </a>
          </small>
          ${post.content}
          <br />
          <small>
            ${post.user.name}
          </small>
        </p>
  
        <div class="post-comments">
          <form action="/comments/create" method="POST">
            <input
              type="text"
              name="content"
              placeholder="Type Here to add comment..."
              required
            />
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add Comment" />
          </form>
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
          </div>
        </div>
      </li>
      `);
  };

  // method to delete from DOM
  let deletePost = (deleteLink) => {
    $(deleteLink).click((e) => {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: (data) => {
          $(`#post-${data.data.post_id}`).remove();
        },
        error: (err) => {
          console.log("errror", err);
        },
      });
    });
  };

  createPost();
}
