export const transformPost = (dbPost) => ({
	id: dbPost.id,
	tittle: dbPost.tittle,
	content: dbPost.content,
	imageUrl: dbPost.img_url,
	publishedAt: dbPost.published_at,
});
