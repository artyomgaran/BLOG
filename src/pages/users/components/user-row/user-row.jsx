/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	id,
	login,
	registredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="user-data">
					<div className="login-column">{login}</div>
					<div className="registred-at-column">{registredAt}</div>
					<div className="role-column">
						<select value={selectedRoleId} onChange={onRoleChange}>
							{roles.map(({ id: roleId, name: roleName }) => (
								<option value={roleId} key={roleId}>
									{roleName}
								</option>
							))}
						</select>
					</div>

					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
				<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
			</TableRow>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		background: #eee;
		padding: 2px;
		margin: 6px;
	}
`;
