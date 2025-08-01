import { request } from '../utils';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (postId, commentId) => async (dispatch) => {
	try {
		await request(`/api/posts/${postId}/comments/${commentId}`, 'DELETE');
		dispatch(removeComment(commentId));
		return true;
	} catch (error) {
		console.error('Ошибка при удалении комментария:', error);
	}
};
