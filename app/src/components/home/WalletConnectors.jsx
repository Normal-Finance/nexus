import React from 'react';
import {
	Box,
	Stack,
	Button,
	FormControl,
	FormLabel,
	Input,
	Avatar,
	HStack,
	Select,
	FormHelperText,
	FormErrorMessage,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	useAccount,
	useNetwork,
	useConnect,
	useDisconnect,
	useEnsAvatar,
	useEnsName,
} from 'wagmi';
import { chains, providers } from '../../constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import config from '../../build/contracts/Nexus.json';

import { Field, Form, Formik } from 'formik';

const WalletConnectors = () => {
	const { address, connector, isConnected } = useAccount();
	const { chain, chains } = useNetwork();
	const { data: ensName } = useEnsName({ address });
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();

	const { config: _config, error: _error } = usePrepareContractWrite({
		address: config.address,
		abi: config.abi,
		functionName: 'createProfile',
		args: [
			'0x1e67fc6860000000000000000000000000000000000000000000000000000000',
			'0x7D504D497b0ca5386F640aDeA2bb86441462d109',
			'Name',
			'Desc',
			'MetaMask',
			'Ethereum',
		],
	});
	console.log(_config, _error);
	const { write: addWallet, isSuccess } = useContractWrite(_config);

	function validateField(value) {
		let error;
		if (!value) {
			error = 'Field is required';
		}
		return error;
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<ConnectButton />
			</div>

			<Box
				rounded={'lg'}
				bg={useColorModeValue('white', 'gray.700')}
				boxShadow={'lg'}
				p={8}
			>
				<Stack spacing={4}>
					<Formik
						initialValues={{
							address: isConnected ? address : '',
							name: isConnected && ensName ? address : '',
							description: '',
							provider:
								isConnected && connector
									? connector.name.toLowerCase()
									: '',
							chain: isConnected ? chain?.name : '',
						}}
						onSubmit={async (values, actions) => {
							// write();
							await addWallet?.();
							// const res = await writeAsync(values.address, values.name)
							console.log(values);
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
											<FormLabel>
												Wallet Address
											</FormLabel>
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
									<Button
										mt={4}
										loadingText="Submitting"
										size="lg"
										bgGradient="linear(to-r, red.400,pink.400)"
										color={'white'}
										_hover={{
											bgGradient:
												'linear(to-r, red.400,pink.400)',
											boxShadow: 'xl',
										}}
										isLoading={props.isSubmitting}
										type="submit"
										// disabled={!write}
										// onClick={() => write?.()}
									>
										Submit
									</Button>

									{error && <div>{error.message}</div>}
								</Stack>
							</Form>
						)}
					</Formik>
				</Stack>
			</Box>
		</>
	);
};

export default WalletConnectors;
