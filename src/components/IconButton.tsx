import { Pressable, PressableProps } from "react-native";
import styled from "styled-components/native";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import { images } from '../images';

interface IImageProps {
	theme?: typeof theme;
	completed: boolean;
}

const Icon = styled.Image`
	tint-color: ${(props: IImageProps) => props.completed ? props.theme?.done : props.theme?.text}
	width: 30px;
	height: 30px;
	margin: 10px;
`;

interface IIconButtonProps extends PressableProps {
	type: any;
	id: string;
	onIconClick: (id: string) => void;
	completed: boolean;
}

const IconButton = (props: IIconButtonProps) => {
	const _onPressOut = () => {
		props.onIconClick(props.id);
	}
	return (
		<Pressable onPressOut={_onPressOut}>
			<Icon source={props.type} completed={props.completed} />
		</Pressable>
	);
};

IconButton.propTypes = {
	type: PropTypes.oneOf(Object.values(images)).isRequired,
	id: PropTypes.string.isRequired,
	onIconClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
}

export default IconButton;
