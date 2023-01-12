// Modules
import {
	Flex,
	Button,
	Center,
	Text,
	FormControl,
	Input,
	Stack,
	Heading,
	FormLabel,
	FormErrorMessage,
	useColorModeValue,
	InputLeftElement,
	InputGroup,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

// Icons
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { EmailIcon } from '@chakra-ui/icons';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useAlert } from '../contexts/AlertContext';

const Signin = () => {
	// Hooks
	const { loginWithRedirect } = useAuth0();
	const { alertSuccess, alertError } = useAlert();

	// State
	const [loading, setLoading] = useState(false);

	// Validation
	function validateEmail(value) {
		if (!value) {
			return false;
		} else if (
			!value
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			return false;
		}
		return true;
	}

	const requestPasswordlessLink = (values) => {
		try {
			const url = `${process.env.REACT_APP_NEXUS_API_PATH}/user/invite`;
			const requestOptions = {
				method: 'POST',
				headers: {
					'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
				},
				body: JSON.stringify({ email: values.email }),
			};

			setLoading(true);
			fetch(url, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setLoading(false);
					if (data.error) {
						alertError(data.msg || 'Unable to create link');
					} else
						alertSuccess('Sign in link successfully sent your way');
				});
		} catch (error) {
			setLoading(false);
			alertError(error.msg || 'Unable to create link');
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

				<Stack spacing={4}>
					<Stack>
						<Formik
							initialValues={{
								email: '',
							}}
							onSubmit={async (values, actions) => {
								await requestPasswordlessLink(values);
								actions.setSubmitting(false);
							}}
						>
							{(props) => (
								<Form>
									{/* Email */}
									<Field
										name="email"
										validate={validateEmail}
									>
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.email &&
													form.touched.email
												}
												isRequired
											>
												<FormLabel>Email</FormLabel>

												<InputGroup>
													<InputLeftElement
														pointerEvents="none"
														children={
															<EmailIcon color="gray.300" />
														}
													/>
													<Input
														type="email"
														placeholder="Your email address"
														{...field}
													/>
												</InputGroup>
												<FormErrorMessage>
													{form.errors.email}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>

									<Stack
										spacing={10}
										style={{ paddingTop: '1rem' }}
									>
										<Button
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500',
											}}
											type="submit"
											loadingText={'Sending...'}
											isLoading={loading}
											disabled={loading}
										>
											Get passwordless link
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>

						<Center height="30px">
							<Text>OR</Text>
						</Center>

						{/* Google */}
						<Button
							variant={'outline'}
							leftIcon={<FcGoogle />}
							onClick={() => loginWithRedirect()}
						>
							<Center>
								<Text>Continue with Google</Text>
							</Center>
						</Button>

						{/* Apple */}
						<Button
							variant={'outline'}
							colorScheme={'black'}
							leftIcon={<FaApple />}
							onClick={() => loginWithRedirect()}
						>
							<Center>
								<Text>Continue with Apple</Text>
							</Center>
						</Button>

						{/* Facebook */}
						<Button
							w={'full'}
							maxW={'md'}
							colorScheme={'facebook'}
							leftIcon={<FaFacebook />}
						>
							<Center>
								<Text>Continue with Facebook</Text>
							</Center>
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default Signin;
