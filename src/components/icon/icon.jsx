/* eslint-disable react/prop-types */
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};

	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
