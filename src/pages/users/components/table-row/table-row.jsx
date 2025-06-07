/* eslint-disable react/prop-types */
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	// border: ${({ border }) => (border ? '1px solid #000' : 'none')};

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .user-data {
		border: ${({ border }) => (border ? '1px solid #000' : 'none')};
	}

	& .login-column {
		margin: 6px;
		width: 172px;
	}

	& .registred-at-column {
		margin: 6px;
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;
