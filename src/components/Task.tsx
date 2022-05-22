import styled from "styled-components/native";
import { images } from "../images";
import { theme } from "../theme";
import IconButton from "./IconButton";
import PropTypes from 'prop-types';
import { ITaskItem } from "../ITaskItem";
import { useState } from "react";
import Input from "./Input";

interface IThemeProps {
	theme?: typeof theme;
}

const Container = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: ${(props: IThemeProps) => props.theme?.itemBackground};
	border-radius: 10px;
	padding: 5px;
	margin: 3px 0px;
`;

interface ITextProps {
	theme?: typeof theme;
	completed: boolean;
}

const Contents = styled.Text`
	flex: 1;
	font-size: 24px;
	color: ${(props: ITextProps) => props.completed ? theme?.done : theme?.text};
	text-decoration-line: ${(props: ITextProps) => props.completed ? 'line-through' : 'none'};
`;

interface ITaskProps {
	item: ITaskItem,
	deleteTask: (item: ITaskItem) => void,
	toggleTask: (item: ITaskItem) => void,
	updateTask: (item: ITaskItem) => void,
}

const Task = (props: ITaskProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(props.item.text);

	const _handleUpdateButtonPress = () => {
		setIsEditing(true);
	}

	const _onSubmitEditing = () => {
		if (isEditing) {
			const editedTask = Object.assign({}, props.item, { text });
			setIsEditing(false);
			props.updateTask(editedTask);
		}
	}

	const _onBlur = () => {
		if (isEditing) {
			setIsEditing(false);
			setText(props.item.text);
		}
	};

	return isEditing ? (
		<Input
			value={text}
			onChangeText={(newText: string) => setText(newText)}
			onSubmitEditing={_onSubmitEditing}
			onBlur={_onBlur}
		/>
	) : (
		<Container>
			<IconButton
				type={props.item.completed ? images.completed : images.uncompleted}
				item={props.item}
				onIconClick={props.toggleTask}
				completed={props.item.completed}
			/>
			<Contents completed={props.item.completed}>{props.item.text}</Contents>
			{props.item.completed || <IconButton type={images.update} item={props.item} onIconClick={_handleUpdateButtonPress} completed={false} />}
			<IconButton
				type={images.delete}
				item={props.item}
				onIconClick={props.deleteTask}
				completed={props.item.completed}
			/>
		</Container>
	);
};

Task.propTypes = {
	item: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	toggleTask: PropTypes.func.isRequired,
	updateTask: PropTypes.func.isRequired,
}

export default Task;
