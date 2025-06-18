/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { Comments, PostContent, PostForm } from './components';
import { useServerRequest } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostAsync, RESET_POST_DATA } from '../../action';
import { selectPost } from '../../selectors';

import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id));
	}, [requestServer, dispatch, params.id, isCreating]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}

			<div></div>
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
