// Modules
import { Stack, Text } from '@chakra-ui/react';
import {
	EmailShareButton,
	FacebookShareButton,
	FacebookMessengerShareButton,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	FacebookMessengerIcon,
	LinkedinIcon,
	RedditIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share';
import { nexusConfig } from '../../config';
import Donate from './Donate';

const SocialShare = () => {
	const iconSize = 30;
	return (
		<div>
			<Stack align={'center'}>
				<Text fontSize={'lg'} color={'gray.600'}>
					Share us on social ❤️
				</Text>
			</Stack>
			<div style={{ textAlign: 'center', paddingTop: '1rem' }}>
				{/* Facebook */}
				<FacebookShareButton
					url={nexusConfig.share.url}
					quote={nexusConfig.share.title}
					style={{ marginRight: '0.5rem' }}
				>
					<FacebookIcon size={iconSize} round />
				</FacebookShareButton>

				{/* Messenger */}
				<FacebookMessengerShareButton
					url={nexusConfig.share.url}
					appId="521270401588372"
					style={{ marginRight: '0.5rem' }}
				>
					<FacebookMessengerIcon size={iconSize} round />
				</FacebookMessengerShareButton>

				{/* Twitter */}
				<TwitterShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					style={{ marginRight: '0.5rem' }}
				>
					<TwitterIcon size={iconSize} round />
				</TwitterShareButton>

				{/* Telegram */}
				<TelegramShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					style={{ marginRight: '0.5rem' }}
				>
					<TelegramIcon size={iconSize} round />
				</TelegramShareButton>

				{/* Whatsapp */}
				<WhatsappShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					separator=":: "
					style={{ marginRight: '0.5rem' }}
				>
					<WhatsappIcon size={iconSize} round />
				</WhatsappShareButton>

				{/* LinkedIn */}
				<LinkedinShareButton
					url={nexusConfig.share.url}
					style={{ marginRight: '0.5rem' }}
				>
					<LinkedinIcon size={iconSize} round />
				</LinkedinShareButton>

				{/* Reddit */}
				<RedditShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					windowWidth={660}
					windowHeight={460}
					style={{ marginRight: '0.5rem' }}
				>
					<RedditIcon size={iconSize} round />
				</RedditShareButton>

				{/* Email */}
				<EmailShareButton
					url={nexusConfig.share.url}
					subject={nexusConfig.share.title}
					body="body"
					style={{ marginRight: '0.5rem' }}
				>
					<EmailIcon size={iconSize} round />
				</EmailShareButton>
			</div>

			<Donate />
		</div>
	);
};

export default SocialShare;
