// Modules
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
} from '@chakra-ui/react';

// Icons
import { DeleteIcon } from '@chakra-ui/icons';

// Hooks
import { useContract } from '../../contexts/ContractContext';

const ConfirmDeleteProfile = ({ isOpen, onClose }) => {
	// Hooks
	const { deleteProfile, executeDeleteProfile } = useContract();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Are you sure you?</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Text mb="1rem">
						Deleting your profile cannot be undone. You'll have to
						re-authenticate and connect all your wallets if you wish
						to recreate your profile.
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="red"
						mr={3}
						leftIcon={<DeleteIcon />}
						loadingText={
							<>
								{deleteProfile.loading &&
									'Waiting for approval'}
								{deleteProfile.started && 'Deleting profile...'}
							</>
						}
						isLoading={
							deleteProfile.loading || deleteProfile.started
						}
						type="submit"
						disabled={
							!deleteProfile ||
							deleteProfile.loading ||
							deleteProfile.started
						}
						onClick={() => {
							executeDeleteProfile();
						}}
					>
						{deleteProfile.loading && 'Waiting for approval'}
						{deleteProfile.started && 'Deleting profile...'}
						{!deleteProfile.loading &&
							!deleteProfile.started &&
							'Delete'}
					</Button>
					<Button
						onClick={onClose}
						disabled={
							deleteProfile.loading || deleteProfile.started
						}
					>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ConfirmDeleteProfile;
