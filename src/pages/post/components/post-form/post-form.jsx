/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Icon } from '../../../../components';
import { savePostAsync } from '../../../../action';
import { useServerRequest } from '../../../../hooks';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils/sanitize-content';

import styled from 'styled-components';
const PostFormContainer = ({
	className,
	post: { id, tittle, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const tittleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newImage = imageRef.current.value;
		const newTittle = tittleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImage,
				tittle: newTittle,
				content: newContent,
			})
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..." />
			<Input ref={tittleRef} defaultValue={tittle} placeholder="Заголовок..." />
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
