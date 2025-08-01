import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header, Footer, Modal, Error } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { setUser } from './action';
import { ERROR } from './constans';

import styled from 'styled-components';

const AppColumn = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	width: 1000px;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currnetUserDataJSON = sessionStorage.getItem('userData');

		if (!currnetUserDataJSON) {
			return;
		}

		const currnetUserData = JSON.parse(currnetUserDataJSON);

		dispatch(
			setUser({
				...currnetUserData,
				roleID: Number(currnetUserData.roleId),
			})
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
