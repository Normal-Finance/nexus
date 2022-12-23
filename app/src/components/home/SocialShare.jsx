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

const SocialShare = () => {
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
					<FacebookIcon size={32} round />
				</FacebookShareButton>

				{/* Messenger */}
				<FacebookMessengerShareButton
					url={nexusConfig.share.url}
					appId="521270401588372"
					style={{ marginRight: '0.5rem' }}
				>
					<FacebookMessengerIcon size={32} round />
				</FacebookMessengerShareButton>

				{/* Twitter */}
				<TwitterShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					style={{ marginRight: '0.5rem' }}
				>
					<TwitterIcon size={32} round />
				</TwitterShareButton>

				{/* Telegram */}
				<TelegramShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					style={{ marginRight: '0.5rem' }}
				>
					<TelegramIcon size={32} round />
				</TelegramShareButton>

				{/* Whatsapp */}
				<WhatsappShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					separator=":: "
					style={{ marginRight: '0.5rem' }}
				>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>

				{/* LinkedIn */}
				<LinkedinShareButton
					url={nexusConfig.share.url}
					style={{ marginRight: '0.5rem' }}
				>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>

				{/* Reddit */}
				<RedditShareButton
					url={nexusConfig.share.url}
					title={nexusConfig.share.title}
					windowWidth={660}
					windowHeight={460}
					style={{ marginRight: '0.5rem' }}
				>
					<RedditIcon size={32} round />
				</RedditShareButton>

				{/* Email */}
				<EmailShareButton
					url={nexusConfig.share.url}
					subject={nexusConfig.share.title}
					body="body"
					style={{ marginRight: '0.5rem' }}
				>
					<EmailIcon size={32} round />
				</EmailShareButton>
			</div>
		</div>
	);
};

export default SocialShare;
