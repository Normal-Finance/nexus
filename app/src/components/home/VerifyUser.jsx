// Modules
import { useState } from 'react';
import { Box, Stack, Button, Text, useColorModeValue } from '@chakra-ui/react';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';
import { useAlert } from '../../contexts/AlertContext';

const VerifyUser = () => {
	// Hooks
	const { user } = useAuth0();
	const { alertSuccess, alertError } = useAlert();

	// State
	const [loading, setLoading] = useState(false);

	// Functions
	const verifyUser = async () => {
		try {
			const url = `${process.env.REACT_APP_NEXUS_API_PATH}/user/verify`;
			const requestOptions = {
				method: 'POST',
				headers: {
					'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
				},
				body: JSON.stringify({ email: user?.email || '' }),
			};

			setLoading(true);
			fetch(url, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setLoading(false);
					if (data.error) {
						alertError(data.msg || 'Unable to verify');
					} else alertSuccess('Verified successfully');
				});
		} catch (error) {
			setLoading(false);
			alertError(error.msg || 'Unable to verify');
		}
	};

	return (
		<Box
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			boxShadow={'lg'}
			p={8}
		>
			<Stack spacing={4}>
				<Stack align={'center'}>
					<Text fontSize={'lg'} color={'gray.600'}>
						Please verify your account to continue...
					</Text>
					<Button
						colorScheme="blue"
						loadingText={'Verifying...'}
						isLoading={loading}
						disabled={loading}
						onClick={verifyUser}
					>
						Verify
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default VerifyUser;
