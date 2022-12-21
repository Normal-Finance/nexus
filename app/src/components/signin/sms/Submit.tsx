import React from 'react';
import {
	Button,
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { FcPhone } from 'react-icons/fc';

const Submit = ({ phoneNumber, handleChange, onSubmit }: any) => {
	return (
		<>
			<div id="recaptcha-container"></div>
			<Stack spacing={4}>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<FcPhone color="gray.300" />}
					/>
					<Input
						placeholder="Phone number"
						value={phoneNumber}
						onChange={handleChange}
					/>
				</InputGroup>
			</Stack>
			<Button
				variant={'outline'}
				onClick={() => {
					onSubmit(phoneNumber);
				}}
			>
				Submit
			</Button>
		</>
	);
};

export default Submit;
