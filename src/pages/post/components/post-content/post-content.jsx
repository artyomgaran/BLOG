import { useNavigate } from 'react-router-dom';
import { SpecialPanel } from '../special-panel/special-panel';
import { H2, Icon } from '../../../../components';

import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constans';

const PostContentContainer = ({
	className,
	post: { id, tittle, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			{imageUrl && <img src={imageUrl} alt={tittle} />}
			<H2>{tittle}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="1px 0px 0 0"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
