import styled from "styled-components/native";
import { images } from "../images";
import { theme } from "../theme";
import IconButton from "./IconButton";
import PropTypes from 'prop-types';

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

interface ITaskItem {
	id: string;
	text: string;
	completed: boolean;
}

interface ITaskProps {
	item: ITaskItem,
	deleteTask: (id: string) => void,
	toggleTask: (id: string) => void,
}

const Task = (props: ITaskProps) => {
	return (
		<Container>
			<IconButton
				type={props.item.completed ? images.completed : images.uncompleted}
				id={props.item.id}
				onIconClick={props.toggleTask}
				completed={props.item.completed}
			/>
			<Contents completed={props.item.completed}>{props.item.text}</Contents>
			{props.item.completed || <IconButton type={images.update} id={props.item.id} />}
			<IconButton
				type={images.delete}
				id={props.item.id}
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
}

export default Task;
