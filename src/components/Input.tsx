import { Dimensions, TextInputProps } from "react-native";
import styled from "styled-components/native";
import { theme } from "../theme";
import PropTypes from 'prop-types';

interface ITextInputProps extends TextInputProps {
	theme?: typeof theme;
	width?: number;
};

const StyledInput = styled.TextInput.attrs<ITextInputProps>(props => ({
	placeholderTextColor: props.theme.main,
}))`
	width: ${(props: ITextInputProps) => props?.width ? (props.width - 40) + 'px' : '100%'};
	height: 60px;
	margin: 3px 0;
	padding: 15px 20px;
	border-radius: 10px;
	background-color: ${(props: ITextInputProps) => props?.theme?.itemBackground};
	font-size: 25px;
	color: ${(props: ITextInputProps) => props?.theme?.text};
`;

const Input = (props: TextInputProps) => {
	const width = Dimensions.get('window').width;
	return (
		<StyledInput
			width={width}
			placeholder={props.placeholder}
			maxLength={50}
			autoCapitalize="none"
			autoCorrect={false}
			returnKeyType="done"
			keyboardAppearance="dark"
			value={props.value}
			onChangeText={props.onChangeText}
			onSubmitEditing={props.onSubmitEditing}
		/>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	onSubmitEditing: PropTypes.func.isRequired,
}

export default Input;
