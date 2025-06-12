/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { H2, Icon } from '../../../../components';

const PostContentContainer = ({
	className,
	post: { id, tittle, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			{imageUrl && <img src={imageUrl} alt={tittle} />}
			<H2>{tittle}</H2>
			<div className="secial-panel">
				<div className="published-at">
					<Icon
						id="fa-calendar-o"
						size="18px"
						margin="0 8px 0 0 "
						onClick={() => {}}
					/>
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => {}}
					/>
					<Icon id="fa-trash-o" size="21px" onClick={() => {}} />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}
	& .secial-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
	}
	& .fa-pencil-square-o {
		position: relative;
		top: 0px;
	}
	& .post-text {
		font-size: 18px;
	}
`;
