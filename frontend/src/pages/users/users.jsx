import { H2, PrivateContent } from '../../components';
import { UserRow, TableRow } from './components';
import { useEffect, useState } from 'react';
import { checkAccess, request } from '../../utils';
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

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request('/api/users'), request('/api/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			}
		);
	}, [userRole, shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setErrorMessage('У вас нет прав для удаления пользователей');
			return;
		}
		request(`/api/users/${userId}`, 'DELETE').then(() => {
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

					{users.map(({ id, login, registerAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registerAt={registerAt}
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
