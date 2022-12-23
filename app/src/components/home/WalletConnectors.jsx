// Modules
import {
	Box,
	Stack,
	Button,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Text,
	Select,
	FormErrorMessage,
	useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

// Constants
import { chains, providers } from '../../constants';

// Hooks
import { useAuth0 } from '@auth0/auth0-react';
import { useContract } from '../../contexts/ContractContext';

const WalletConnectors = () => {
	// Hooks
	const { user } = useAuth0();
	const {
		getWallets,
		createProfile,
		executeCreateProfile,
		insertWallet,
		executeInsertWallet,
	} = useContract();

	const _createProfile = async () => {
		try {
			const url = `${process.env.REACT_APP_NEXUS_API_PATH}/profile`;
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
				},
				body: JSON.stringify({ email: user.email, isServerSide: '' }),
			};
			const response = await fetch(url, requestOptions);
			const json = await response.json();
			console.log(json);
		} catch (error) {
			console.log('error', error);
		}
	};

	// Validation
	function validateField(value) {
		let error;
		if (!value) {
			error = 'Field is required';
		}
		return error;
	}

	return (
		<Box
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			boxShadow={'lg'}
			p={8}
		>
			<Stack spacing={4}>
				{getWallets.data !== undefined ? (
					<Formik
						initialValues={{
							address: '',
							name: '',
							description: '',
							provider: '',
							chain: '',
						}}
						onSubmit={async (values, actions) => {
							if (getWallets.data.length === 0) {
								executeCreateProfile(
									values.address,
									values.name,
									values.description,
									values.provider,
									values.chain
								);
							} else {
								executeInsertWallet(
									values.address,
									values.name,
									values.description,
									values.provider,
									values.chain
								);
							}

							actions.setSubmitting(false);
						}}
					>
						{(props) => (
							<Form>
								{/* Address */}
								<Field name="address" validate={validateField}>
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.address &&
												form.touched.address
											}
											isRequired
										>
											<FormLabel>Address</FormLabel>
											<Input {...field} />
											<FormErrorMessage>
												{form.errors.address}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								{/* Name */}
								<Field name="name" validate={validateField}>
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.name &&
												form.touched.name
											}
											isRequired
										>
											<FormLabel>Name</FormLabel>
											<Input {...field} />
											<FormErrorMessage>
												{form.errors.name}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								{/* Description */}
								<Field
									name="description"
									validate={validateField}
								>
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.description &&
												form.touched.description
											}
											isRequired
										>
											<FormLabel>Description</FormLabel>
											<Input {...field} />
											<FormErrorMessage>
												{form.errors.description}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<HStack>
									{/* Provider */}
									<Box>
										<Field
											name="provider"
											validate={validateField}
										>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.provider &&
														form.touched.provider
													}
													isRequired
												>
													<FormLabel>
														Provider
													</FormLabel>
													<Select {...field}>
														{providers.map(
															(provider) => {
																return (
																	<option
																		value={
																			provider.value
																		}
																	>
																		{
																			provider.name
																		}
																	</option>
																);
															}
														)}
													</Select>
													<FormErrorMessage>
														{form.errors.provider}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</Box>
									{/* Chain */}
									<Box>
										<Field
											name="chain"
											validate={validateField}
										>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.chain &&
														form.touched.chain
													}
													isRequired
												>
													<FormLabel>Chain</FormLabel>
													<Select {...field}>
														{chains.map((chain) => {
															return (
																<option
																	value={
																		chain.value
																	}
																>
																	{chain.name}
																</option>
															);
														})}
													</Select>
													<FormErrorMessage>
														{form.errors.chain}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</Box>
								</HStack>

								<Stack spacing={10} pt={2}>
									{getWallets.data.length === 0 ? (
										<>
											<Button
												mt={4}
												size="lg"
												bgGradient="linear(to-r, red.400,pink.400)"
												color={'white'}
												_hover={{
													bgGradient:
														'linear(to-r, red.400,pink.400)',
													boxShadow: 'xl',
												}}
												// loadingText={
												// 	<>
												// 		{insertWallet.loading &&
												// 			'Waiting for approval'}
												// 		{insertWallet.started &&
												// 			'Creating profile...'}
												// 	</>
												// }
												// isLoading={
												// 	createProfile.loading ||
												// 	createProfile.started
												// }
												type="submit"
												// disabled={
												// 	!createProfile ||
												// 	createProfile.loading ||
												// 	createProfile.started
												// }
											>
												{/* {createProfile.loading &&
													'Waiting for approval'}
												{createProfile.started &&
													'Creating profile...'}
												{!createProfile.loading &&
													!createProfile.started &&
													'Create profile'} */}
												Create profile
											</Button>
											<Text align={'center'}>
												Add your first wallet to create
												your public profile
											</Text>
										</>
									) : (
										<Button
											mt={4}
											size="lg"
											bgGradient="linear(to-r, red.400,pink.400)"
											color={'white'}
											_hover={{
												bgGradient:
													'linear(to-r, red.400,pink.400)',
												boxShadow: 'xl',
											}}
											loadingText={
												<>
													{insertWallet.loading &&
														'Waiting for approval'}
													{insertWallet.started &&
														'Adding wallet...'}
												</>
											}
											isLoading={
												insertWallet.loading ||
												insertWallet.started
											}
											type="submit"
											disabled={
												!insertWallet ||
												insertWallet.loading ||
												insertWallet.started
											}
										>
											{insertWallet.loading &&
												'Waiting for approval'}
											{insertWallet.started &&
												'Adding wallet...'}
											{!insertWallet.loading &&
												!insertWallet.started &&
												'Submit'}
										</Button>
									)}
								</Stack>
							</Form>
						)}
					</Formik>
				) : (
					<p>NOne</p>
				)}
			</Stack>
		</Box>
	);
};

export default WalletConnectors;
