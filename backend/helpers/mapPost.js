const mongoose = require("mongoose");
const mapComments = require("./mapComments");

module.exports = function Post(post) {
  return {
    id: post.id,
    title: post.title,
    imageUrl: post.image,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComments(comment)
    ),
    content: post.content,
    publishedAt: post.createdAt,
  };
};
