// Modules
import React from 'react';
import {
	Flex,
	Button,
	Center,
	Text,
	Box,
	Stack,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';

const Signin = () => {
	// Hooks
	const { loginWithRedirect } = useAuth0();

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
								onClick={() => loginWithRedirect()}
							>
								<Center>
									<Text>Sign in with Google</Text>
								</Center>
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Signin;
