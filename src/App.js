import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import PersikTwo from './panels/PersikTwo';
import Clicker from "./panels/Clicker";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [fetchedUserFrends, setUserFrends] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		let token = "";
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);

			const api = await bridge.send('VKWebAppGetAuthToken', {
				app_id: 51558554,
				scope: 'friends,status'
			})
				.then((data) => {
					if (data.access_token) {
						// Ключ доступа пользователя получен
						 token = data.access_token
					}
				})
				.catch((error) => {
					// Ошибка
					console.log(error);
				});

			const frends = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'friends.get',
				request_id: 'fetFriends',
				params: {
					order: 'random',
					fields: 'photo_100',
					v: '5.131',
					access_token: token
				}})
				.then((data) => {
					if (data.response) {
						// Метод API выполнен
						setUserFrends(data.response.items)
					}
				})
				.catch((error) => {
					// Ошибка
					console.log(error);
				});
		}
		fetchData();
	}, []);

	const deleteF = (i) => {
		const newF = fetchedUserFrends;
		newF.splice(i, 1);
		setUserFrends(newF);
	};

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser} go={go} />
								<Persik id='persik' go={go} />
								<PersikTwo id='persiktwo' go={go} />
								<Clicker id="clicker" friends={fetchedUserFrends} deleteF={deleteF} go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
