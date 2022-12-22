import React, { useEffect } from 'react';
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
import { useAccount } from 'wagmi';
import { chains, providers, tempPhoneNumber } from '../../constants';

import {
	useContractRead,
	useContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import config from '../../build/contracts/Nexus.json';

import { Field, Form, Formik } from 'formik';
import sha256 from 'crypto-js/sha256';

const WalletConnectors = () => {
	// Smart Contract
	const {
		data: wallets,
		isError,
		isLoading,
	} = useContractRead({
		address: config.address,
		abi: config.abi,
		functionName: 'getWallets',
		args: ['0x' + sha256(tempPhoneNumber).toString()],
	});

	const {
		data: createProfileData,
		write: createProfile,
		isLoading: isCreateProfileLoading,
		isSuccess: isCreateProfileStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: config.address,
		abi: config.abi,
		functionName: 'createProfile',
	});

	const { isSuccess: createProfileTxSuccess } = useWaitForTransaction({
		hash: createProfileData?.data,
	});

	const {
		data: insertWalletData,
		write: insertWallet,
		isLoading: isInsertWalletLoading,
		isSuccess: isInsertWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: config.address,
		abi: config.abi,
		functionName: 'insertWallet',
	});

	const { isSuccess: insertWalletTxSuccess } = useWaitForTransaction({
		hash: insertWalletData?.data,
	});

	useEffect(() => {
		if (createProfileTxSuccess || insertWalletTxSuccess)
			window.location.reload();
	}, [createProfileTxSuccess, insertWalletTxSuccess]);

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
				{wallets !== undefined ? (
					<Formik
						initialValues={{
							address: '',
							name: '',
							description: '',
							provider: '',
							chain: '',
						}}
						onSubmit={async (values, actions) => {
							if (wallets.length === 0) {
								await createProfile?.({
									recklesslySetUnpreparedArgs: [
										'0x' +
											sha256(tempPhoneNumber).toString(),
										values.address,
										values.name,
										values.description,
										values.provider,
										values.chain,
									],
								});
							} else {
								await insertWallet?.({
									recklesslySetUnpreparedArgs: [
										'0x' +
											sha256(tempPhoneNumber).toString(),
										values.address,
										values.name,
										values.description,
										values.provider,
										values.chain,
									],
								});
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
									{wallets.length === 0 ? (
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
												loadingText={
													<>
														{isInsertWalletLoading &&
															'Waiting for approval'}
														{isInsertWalletStarted &&
															'Creating profile...'}
													</>
												}
												isLoading={
													isCreateProfileLoading ||
													isCreateProfileStarted
												}
												type="submit"
												disabled={
													!createProfile ||
													isCreateProfileLoading ||
													isCreateProfileStarted
												}
											>
												{isCreateProfileLoading &&
													'Waiting for approval'}
												{isCreateProfileStarted &&
													'Creating profile...'}
												{!isCreateProfileLoading &&
													!isCreateProfileStarted &&
													'Create profile'}
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
													{isInsertWalletLoading &&
														'Waiting for approval'}
													{isInsertWalletStarted &&
														'Adding wallet...'}
												</>
											}
											isLoading={
												isInsertWalletLoading ||
												isInsertWalletStarted
											}
											type="submit"
											disabled={
												!insertWallet ||
												isInsertWalletLoading ||
												isInsertWalletStarted
											}
										>
											{isInsertWalletLoading &&
												'Waiting for approval'}
											{isInsertWalletStarted &&
												'Adding wallet...'}
											{!isInsertWalletLoading &&
												!isInsertWalletStarted &&
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
