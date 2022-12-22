import React from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
	Button,
	FormControl,
	Flex,
	Stack,
	useColorModeValue,
	HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';

const Verify = ({ phoneNumber, onSubmit }: any) => {
	const [code, setCode] = React.useState('');
	const handleChange = (value: any) => setCode(value);

	return (
		<Stack spacing={4} w={'full'} maxW={'sm'}>
			<Center>
				<Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
					Verify your phone
				</Heading>
			</Center>
			<Center
				fontSize={{ base: 'sm', sm: 'md' }}
				color={useColorModeValue('gray.800', 'gray.400')}
			>
				We have sent code to your phone
			</Center>
			<Center
				fontSize={{ base: 'sm', sm: 'md' }}
				fontWeight="bold"
				color={useColorModeValue('gray.800', 'gray.400')}
			>
				{phoneNumber}
			</Center>
			<FormControl>
				<Center>
					<HStack>
						<PinInput otp onChange={handleChange}>
							<PinInputField />
							<PinInputField />
							<PinInputField />
							<PinInputField />
							<PinInputField />
							<PinInputField />
						</PinInput>
					</HStack>
				</Center>
			</FormControl>
			<Stack spacing={6}>
				<Button
					bg={'blue.400'}
					color={'white'}
					_hover={{
						bg: 'blue.500',
					}}
					onClick={() => {
						onSubmit(code);
					}}
				>
					Verify
				</Button>
			</Stack>
		</Stack>
	);
};

export default Verify;
