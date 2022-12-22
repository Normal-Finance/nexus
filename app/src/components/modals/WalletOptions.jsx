import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Tag,
	Avatar,
	TagLabel,
	Code,
	Input,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import config from '../../build/contracts/Nexus.json';
import { tempPhoneNumber } from '../../constants';

const WalletOptions = ({ isOpen, wallet, walletIndex, onClose }) => {
	console.log(wallet);
	// Smart Contract
	const {
		data: updateWalletData,
		write: updateWallet,
		isLoading: isUpdateWalletLoading,
		isSuccess: isUpdateWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: config.address,
		abi: config.abi,
		functionName: 'updateWallet',
	});

	const {
		data: deleteWalletData,
		write: deleteWallet,
		isLoading: isDeleteWalletLoading,
		isSuccess: isDeleteWalletStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: config.address,
		abi: config.abi,
		functionName: 'deleteWallet',
	});

	// Validation
	function validateField(value) {
		let error;
		if (!value) {
			error = 'Field is required';
		}
		return error;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Formik
					initialValues={{
						name: wallet?.name || '',
						description: wallet?.description || '',
					}}
					onSubmit={async (values, actions) => {
						console.log(actions);
						console.log(values);
						actions.setSubmitting(false);
					}}
				>
					{(props) => (
						<>
							<ModalHeader>Manage your wallet</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								<Tag variant="solid" colorScheme="blue">
									<Avatar
										src={`/walletProviders/${wallet?.provider}.png`}
										size="xs"
										name={wallet?.provider}
										ml={-1}
										mr={2}
									/>
									<TagLabel>{wallet?.provider}</TagLabel>
								</Tag>
								<Tag variant="solid" colorScheme="teal">
									{wallet?.chain}
								</Tag>
								<Code>{wallet?._address}</Code>

								<Form>
									{/* Name */}
									<Field name="name" validate={validateField}>
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.name &&
													form.touched.name
												}
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
											>
												<FormLabel>
													Description
												</FormLabel>
												<Input {...field} />
												<FormErrorMessage>
													{form.errors.description}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Form>
							</ModalBody>

							<ModalFooter>
								{/* Update */}
								<Button
									colorScheme="blue"
									mr={3}
									loadingText={
										<>
											{isUpdateWalletLoading &&
												'Waiting for approval'}
											{isUpdateWalletStarted &&
												'Updating wallet...'}
										</>
									}
									isLoading={
										isUpdateWalletLoading ||
										isUpdateWalletStarted
									}
									type="submit"
									disabled={
										isUpdateWalletLoading ||
										isUpdateWalletStarted ||
										isDeleteWalletLoading ||
										isDeleteWalletStarted
									}
									onClick={() => {
										updateWallet?.({
											recklesslySetUnpreparedArgs: [
												ethers.utils.formatBytes32String(
													tempPhoneNumber
												),
												walletIndex,
												props.values.name,
												props.values.description,
											],
										});
									}}
								>
									{isUpdateWalletLoading &&
										'Waiting for approval'}
									{isUpdateWalletStarted &&
										'Updating wallet...'}
									{!isUpdateWalletLoading &&
										!isUpdateWalletStarted &&
										'Update'}
								</Button>

								{/* Delete */}
								<Button
									colorScheme="red"
									loadingText={
										<>
											{isDeleteWalletLoading &&
												'Waiting for approval'}
											{isDeleteWalletStarted &&
												'Deleting wallet...'}
										</>
									}
									isLoading={
										isDeleteWalletLoading ||
										isDeleteWalletStarted
									}
									disabled={
										isDeleteWalletLoading ||
										isDeleteWalletStarted ||
										isUpdateWalletLoading ||
										isUpdateWalletStarted
									}
									onClick={() => {
										deleteWallet?.({
											recklesslySetUnpreparedArgs: [
												ethers.utils.formatBytes32String(
													tempPhoneNumber
												),
												walletIndex,
											],
										});
									}}
								>
									{isDeleteWalletLoading &&
										'Waiting for approval'}
									{isDeleteWalletStarted &&
										'Deleting wallet...'}
									{!isDeleteWalletLoading &&
										!isDeleteWalletStarted &&
										'Delete'}
								</Button>
							</ModalFooter>
						</>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	);
};

export default WalletOptions;
