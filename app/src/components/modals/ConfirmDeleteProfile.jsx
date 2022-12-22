import React from 'react';
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
import { useContractWrite } from 'wagmi';
import config from '../../build/contracts/Nexus.json';
import { ethers } from 'ethers';
import { tempPhoneNumber } from '../../constants';
import { DeleteIcon } from '@chakra-ui/icons';

const ConfirmDeleteProfile = ({ isOpen, onClose }) => {
	// Smart Contract
	const {
		data: deleteProfileData,
		write: deleteProfile,
		isLoading: isDeleteProfileLoading,
		isSuccess: isDeleteProfileStarted,
	} = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: config.address,
		abi: config.abi,
		functionName: 'deleteProfile',
	});

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
								{isDeleteProfileLoading &&
									'Waiting for approval'}
								{isDeleteProfileStarted &&
									'Deleting profile...'}
							</>
						}
						isLoading={
							isDeleteProfileLoading || isDeleteProfileStarted
						}
						type="submit"
						disabled={
							!deleteProfile ||
							isDeleteProfileLoading ||
							isDeleteProfileStarted
						}
						onClick={() => {
							deleteProfile?.({
								recklesslySetUnpreparedArgs: [
									ethers.utils.formatBytes32String(
										tempPhoneNumber
									),
								],
							});
						}}
					>
						{isDeleteProfileLoading && 'Waiting for approval'}
						{isDeleteProfileStarted && 'Deleting profile...'}
						{!isDeleteProfileLoading &&
							!isDeleteProfileStarted &&
							'Delete'}
					</Button>
					<Button
						onClick={onClose}
						disabled={
							isDeleteProfileLoading || isDeleteProfileStarted
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
