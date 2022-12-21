// Modules
import React from 'react';
import { Button, Center, Text, Box, Grid, VStack } from '@chakra-ui/react';
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
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<ColorModeSwitcher justifySelf="flex-end" />
				<VStack spacing={8}>
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
				</VStack>
			</Grid>
		</Box>
	);
};

export default Signin;
