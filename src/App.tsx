import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import Input from './components/Input';
import { theme } from './theme';
import Task from './components/Task';
import { ITaskItem } from './ITaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

interface IThemeProps {
	theme: typeof theme;
};

const Container = styled.SafeAreaView`
	flex: 1;
	backgroud-color: ${(props: IThemeProps) => props.theme.background};
	align-items: center;
	justify-content: flex-start;
`;

const Title = styled.Text`
	font-size: 40px;
	font-weight: 600;
	color: ${(props: IThemeProps) => props.theme.main};
	align-self: flex-start;
	margin: 0px 20px;
`;

interface IListProps {
	width: number;
}

const List = styled.ScrollView`
	flex: 1;
	width: ${(props: IListProps) => props.width - 40}px;
`;

export default function App() {
	// const taskItems: { [id: string]: ITaskItem } = {
	// 	'1': { id: '1', text: 'Hanbit', completed: false },
	// 	'2': { id: '2', text: 'React Native', completed: true },
	// 	'3': { id: '3', text: 'React Native Sample', completed: false },
	// 	'4': { id: '4', text: 'Edit TODO Item', completed: false },
	// }
	const taskItems: { [id: string]: ITaskItem } = {};
	const [isReady, setIsReady] = useState(false);
	const [newTask, setNewTask] = useState('');
	const [tasks, setTasks] = useState(taskItems);

	const width = Dimensions.get('window').width;

	const _saveTasks = async (tasks: typeof taskItems) => {
		try {
			await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
			setTasks(tasks);
		} catch (e) {
			console.error(e);
		}
	};

	const _loadTasks = async () => {
		const loadedTasks = await AsyncStorage.getItem('tasks');
		setTasks(JSON.parse(loadedTasks || '{}'));
	}

	const _addTask = () => {
		const ID = Date.now().toString();
		const newTaskObject = {
			[ID]: { id: ID, text: newTask, completed: false },
		};
		setNewTask('');
		_saveTasks({ ... tasks, ...newTaskObject });
	};

	const _deleteTask = (item: ITaskItem) => {
		const currentTasks = Object.assign({}, tasks);
		delete currentTasks[item.id];
		_saveTasks(currentTasks);
	}

	const _toggleTask = (item: ITaskItem) => {
		const currentTasks = Object.assign({}, tasks);
		currentTasks[item.id].completed = !currentTasks[item.id].completed;
		_saveTasks(currentTasks);
	}

	const _updateTask = (item: ITaskItem) => {
		const currentTasks = Object.assign({}, tasks);
		currentTasks[item.id] = item;
		_saveTasks(currentTasks);
	}

	const _handleTextChange = (text: string) => {
		setNewTask(text);
	};

	const _onBlur = () => {
		setNewTask('');
	};
	
	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await _loadTasks();
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	return isReady ? (
		<ThemeProvider theme={theme}>
			<Container onLayout={onLayoutRootView}>
				<StatusBar barStyle="light-content" backgroundColor={theme.background} />
				<Title>TODO List</Title>
				<Input
					placeholder="+ Add a Task"
					value={newTask}
					onChangeText={_handleTextChange}
					onSubmitEditing={_addTask}
					onBlur={_onBlur}
				/>
				<List width={width}>
					{Object.values(tasks)
						.reverse()
						.map(item => (
							<Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} />
						))}
				</List>
			</Container>
		</ThemeProvider>
	) : null;
};
