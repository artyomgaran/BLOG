module.exports = function Comments(comments) {
  return {
    content: comments.content,
    author: comments.author.login,
    id: comments._id,
    publishedAt: comments.createdAt,
  };
};
