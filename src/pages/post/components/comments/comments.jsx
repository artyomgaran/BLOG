/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserId } from '../../../../selectors';
import { addCommentAsync } from '../../../../action';
('../../../../action');
import { useServerRequest } from '../../../../hooks';

import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const [newComment, setNewComment] = useState('');
	const requestServer = useServerRequest();

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};
	console.log(comments);

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane-o"
					size="18px"
					margin="0 0 0 10px"
					onClick={() => onNewCommentAdd(userId, postId, newComment)}
				/>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		font-size: 18px;
		resize: none;
	}
`;
