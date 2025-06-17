/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { Comments, PostContent, PostForm } from './components';
import { useServerRequest } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostAsync } from '../../action';
import { selectPost } from '../../selectors';

import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/post/:id/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [requestServer, dispatch, params.id]);

	return (
		<div className={className}>
			{isEditing ? (
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
