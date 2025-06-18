import { generateDate } from '../utils';

export const addPost = ({ imageUrl, tittle, content }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			img_url: imageUrl,
			published_at: generateDate(),
			tittle,
			content,
		}),
	}).then((createdPost) => createdPost.json());
