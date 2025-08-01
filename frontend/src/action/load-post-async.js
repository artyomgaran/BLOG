import { request } from '../utils';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => async (dispatch) => {
	const postData = await request(`/api/posts/${postId}`);
	if (postData.data) {
		dispatch(setPostData(postData.data));
	}
	return postData;
};
