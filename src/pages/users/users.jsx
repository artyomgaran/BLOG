/* eslint-disable react/prop-types */

import { H2, PrivateContent } from '../../components';
import { UserRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			}
		);
	}, [userRole, requestServer, shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN, userRole])) {
			return;
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registred-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users.map(({ id, login, registredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registredAt={registredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
