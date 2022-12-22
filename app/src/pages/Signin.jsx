// Modules
import React from 'react';
import {
	Flex,
	Button,
	Center,
	Text,
	Box,
	Grid,
	VStack,
	Stack,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { UserAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

// Components
import Verify from '../components/signin/sms/Verify';
import Submit from '../components/signin/sms/Submit';

const Signin = () => {
	// Hooks
	const { googleSignIn, sendSMSVerificationCode, submitSMSVerificationCode } =
		UserAuth();

	// State
	const [phoneNumberView, setPhoneNumberView] = React.useState('submit');
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const handlePhoneNumberChange = (event) =>
		setPhoneNumber(event.target.value);

	// Functions
	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const handlePhoneNumberSubmit = async (phoneNumber) => {
		try {
			sendSMSVerificationCode(phoneNumber);
			setPhoneNumberView('verify');
		} catch (error) {
			console.log(error);
		}
	};

	const handlePhoneNumberVerify = async (code) => {
		try {
			submitSMSVerificationCode(code);
			// setPhoneNumberView('verify');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to Nexus by</Heading>
					<Heading
						fontSize={'4xl'}
						bgGradient="linear(to-l, #7928CA, #FF0080)"
						bgClip="text"
					>
						Normal
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to connect your wallets with the world 🌎
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<Stack spacing={10}>
							<Button
								variant={'outline'}
								leftIcon={<FcGoogle />}
								onClick={handleGoogleSignIn}
							>
								<Center>
									<Text>Sign in with Google</Text>
								</Center>
							</Button>

							{phoneNumberView === 'submit' && (
								<Submit
									phoneNumber={phoneNumber}
									handleChange={handlePhoneNumberChange}
									onSubmit={handlePhoneNumberSubmit}
								/>
							)}
							{phoneNumberView === 'verify' && (
								<Verify
									phoneNumber={phoneNumber}
									onSubmit={handlePhoneNumberVerify}
								/>
							)}
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Signin;
