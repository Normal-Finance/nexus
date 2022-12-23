// Modules
import { useEffect } from 'react';
import {
	InputGroup,
	InputLeftElement,
	Input,
	TableContainer,
	Thead,
	Tr,
	Th,
	Table,
	Avatar,
	Tbody,
	Text,
	Td,
	Card,
	CardBody,
	Button,
	CardHeader,
	Heading,
	Code,
	Divider,
} from '@chakra-ui/react';

// Icons
import { SearchIcon, CopyIcon } from '@chakra-ui/icons';

// Hooks
import { useContract } from '../../contexts/ContractContext';

const Search = ({ value, handleChange }) => {
	// Hooks
	const { getWallets } = useContract();

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

	useEffect(() => {
		if (validateEmail(value)) {
			try {
				const url = `${process.env.REACT_APP_NEXUS_API_PATH}/user/hash?email=${value}`;
				const requestOptions = {
					method: 'GET',
					headers: {
						'x-api-key': process.env.REACT_APP_NEXUS_API_KEY,
					},
				};
				fetch(url, requestOptions).then((response) => {
					console.log(response.json());
				});
			} catch (error) {
				console.log('error', error);
			}
		}
	}, [value]);

	const sendInvite = () => {};

	const sendEmail = () => {
		window.location.href =
			'mailto:jblewdv@gmail.com?subject=Checkout%20Nexus&body=Hey%20here';
	};

	return (
		<>
			{/* Search Form */}
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon />}
				/>
				<Input
					type="tel"
					placeholder="Search people by phone number"
					value={value}
					onChange={(event) => {
						handleChange(event.target.value);
					}}
				/>
			</InputGroup>

			{/* Results */}
			{value !== '' && !getWallets.loading && getWallets.data && (
				<Card
					variant={'elevated'}
					style={{ marginTop: '2rem', backgroundColor: 'white' }}
				>
					<CardHeader>
						<Heading size="md">
							Results ({getWallets.data.length})
						</Heading>
					</CardHeader>
					<Divider />
					<CardBody>
						{getWallets.data.length > 0 ? (
							<TableContainer>
								<Table variant="simple">
									<Thead>
										<Tr>
											<Th>Provider</Th>
											<Th>Chain</Th>
											<Th>Name</Th>
											<Th>Description</Th>
											<Th>Address</Th>
										</Tr>
									</Thead>
									<Tbody>
										{getWallets.data.map((wallet) => {
											return (
												<Tr>
													<Td>
														<Avatar
															size="sm"
															mr="4"
															// fontSize="16"
															// _groupHover={{
															// 	color: 'white',
															// }}
															name={
																wallet.provider
															}
															src={`/walletProviders/${wallet.provider}.png`}
														/>
														{wallet.provider}
													</Td>
													<Td>{wallet.chain}</Td>
													<Td>{wallet.name}</Td>
													<Td>
														{wallet.description}
													</Td>
													<Td>
														<Code>
															{wallet._address}
														</Code>{' '}
														<CopyIcon
															onClick={() => {
																navigator.clipboard.writeText(
																	wallet._address
																);
																alert(
																	'Wallet address copied!'
																);
															}}
														/>
													</Td>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</TableContainer>
						) : (
							<>
								<Text mb={3}>
									There are no wallets associated with this
									phone number.
								</Text>
								<Button
									mr={3}
									colorScheme="blue"
									onClick={sendInvite}
								>
									Invite via SMS
								</Button>
								<Button colorScheme="teal" onClick={sendEmail}>
									Invite via Email
								</Button>
							</>
						)}
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default Search;
