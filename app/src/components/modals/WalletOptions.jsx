// Modules
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

// Hookds
import { useContract } from '../../contexts/ContractContext';

const WalletOptions = ({ isOpen, wallet, walletIndex, onClose }) => {
	// Hookds
	const {
		updateWallet,
		executeUpdateWallet,
		deleteWallet,
		executeDeleteWallet,
	} = useContract();

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
									{wallet?.provider}
								</Tag>
								<Tag variant="solid" colorScheme="teal">
									{wallet?.chain}
								</Tag>
								<Code>{wallet?.walletAddress}</Code>

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
											{updateWallet.loading &&
												'Waiting for approval'}
											{updateWallet.started &&
												'Updating wallet...'}
										</>
									}
									isLoading={
										updateWallet.loading ||
										updateWallet.started
									}
									type="submit"
									disabled={
										updateWallet.loading ||
										updateWallet.started ||
										deleteWallet.loading ||
										deleteWallet.started
									}
									onClick={() => {
										executeUpdateWallet(
											walletIndex,
											props.values.name,
											props.values.description
										);
									}}
								>
									{updateWallet.loading &&
										'Waiting for approval'}
									{updateWallet.started &&
										'Updating wallet...'}
									{!updateWallet.loading &&
										!updateWallet.started &&
										'Update'}
								</Button>

								{/* Delete */}
								<Button
									colorScheme="red"
									loadingText={
										<>
											{deleteWallet.loading &&
												'Waiting for approval'}
											{deleteWallet.started &&
												'Deleting wallet...'}
										</>
									}
									isLoading={
										deleteWallet.loading ||
										deleteWallet.started
									}
									disabled={
										deleteWallet.loading ||
										deleteWallet.started ||
										updateWallet.loading ||
										updateWallet.started
									}
									onClick={() => {
										executeDeleteWallet(walletIndex);
									}}
								>
									{deleteWallet.loading &&
										'Waiting for approval'}
									{deleteWallet.started &&
										'Deleting wallet...'}
									{!deleteWallet.loading &&
										!deleteWallet.started &&
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
