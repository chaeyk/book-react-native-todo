import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import IconButton from './components/IconButton';
import Input from './components/Input';
import { theme } from './theme';
import { images } from './images';
import Task from './components/Task';

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
	const [newTask, setNewTask] = useState('');
	const [tasks, setTasks] = useState({
		'1': { id: '1', text: 'Hanbit', completed: false },
		'2': { id: '2', text: 'React Native', completed: true },
		'3': { id: '3', text: 'React Native Sample', completed: false },
		'4': { id: '4', text: 'Edit TODO Item', completed: false },
	});

	const width = Dimensions.get('window').width;

	const _addTask = () => {
		const ID = Date.now().toString();
		const newTaskObject = {
			[ID]: { id: ID, text: newTask, completed: false },
		};
		setNewTask('');
		setTasks({ ...tasks, ...newTaskObject });
	};

	const _deleteTask = (id: string) => {
		const currentTasks = Object.assign({}, tasks);
		delete currentTasks[id];
		setTasks(currentTasks);
	}

	const _toggleTask = (id: string) => {
		const currentTasks = Object.assign({}, tasks);
		currentTasks[id].completed = !currentTasks[id].completed;
		setTasks(currentTasks);
	}

	const _handleTextChange = (text: string) => {
		setNewTask(text);
	};
	
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<StatusBar barStyle="light-content" backgroundColor={theme.background} />
				<Title>TODO List</Title>
				<Input
					placeholder="+ Add a Task"
					value={newTask}
					onChangeText={_handleTextChange}
					onSubmitEditing={_addTask}
				/>
				<List width={width}>
					{Object.values(tasks)
						.reverse()
						.map(item => (
							<Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} />
						))}
				</List>
			</Container>
		</ThemeProvider>
	);
};
