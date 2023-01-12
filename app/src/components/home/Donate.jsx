// Modules
import { Button } from '@chakra-ui/react';
import { FaBitcoin, FaRegCreditCard } from 'react-icons/fa';

const Donate = () => {
	return (
		<div style={{ textAlign: 'center', paddingTop: '1rem' }}>
			{/* Coinbase */}
			<Button
				mr={3}
				size="sm"
				colorScheme="messenger"
				leftIcon={<FaBitcoin />}
				onClick={() =>
					window.open(
						'https://commerce.coinbase.com/checkout/2d4ba661-eabe-424d-8b65-df8c301eb27f',
						'_blank',
						'noopener,noreferrer'
					)
				}
			>
				Donate Crypto
			</Button>

			{/* Coinbase */}
			<Button
				mr={3}
				size="sm"
				colorScheme="whatsapp"
				leftIcon={<FaRegCreditCard />}
				onClick={() =>
					window.open(
						'https://buy.stripe.com/6oE6rCeQA9fGbrWeUV',
						'_blank',
						'noopener,noreferrer'
					)
				}
			>
				Donate Fiat
			</Button>
		</div>
	);
};

export default Donate;
