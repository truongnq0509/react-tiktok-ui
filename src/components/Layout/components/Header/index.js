import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCoins, faEarthAmerica, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { LetterIcon, UploadIcon, MessageIcon } from '~/components/Icons'
import Image from '~/components/Image';
import Search from '../Search'
import routesConfig from '~/config/routes'


const cx = classNames.bind(styles)


const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAmerica} />,
		title: 'English',
		children: {
			title: 'Language',
			data: [
				{
					type: 'language',
					code: 'en',
					title: 'English',
				},
				{
					type: 'language',
					code: 'vi',
					title: 'Tiếng Việt',
				}
			]
		}
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion} />,
		title: 'Feedback and Help',
		to: '/feedback'
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shortcuts',
	},
]


function Header() {
	const currentUser = true

	// Handle
	const handleMenuChange = menuItem => {
		switch (menuItem.type) {
			case 'language':
				// Handle change language
				break;
			default:

		}
	}

	const userMenu = [
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'View profile',
			to: '/@thao'
		},
		{
			icon: <FontAwesomeIcon icon={faCoins} />,
			title: 'Get coins',
			to: '/coin'
		},
		{
			icon: <FontAwesomeIcon icon={faGear} />,
			title: 'Settings',
			to: '/setting'
		},
		...MENU_ITEMS,

		{
			icon: <FontAwesomeIcon icon={faSignOut} />,
			title: 'Log out',
			to: '/logout',
			separate: true
		},
	]



	return <header className={cx('wrapper')}>
		<div className={cx('inner')}>
			<Link to={routesConfig.home} className={cx('logo-link')}>
				<img
					src={images.logo}
					alt="TikTok"
				/>
			</Link>

			<Search />


			<div className={cx('actions')}>
				{currentUser ? (
					<>
						<Tippy
							content="Upload video"
							placement='bottom'
							delays={[0, 200]}
						>
							<button className={cx('action-btn')}>
								<UploadIcon />
							</button>
						</Tippy>

						<Tippy
							content="Tin nhắn"
							placement='bottom'
							delays={[0, 200]}
						>
							<button className={cx('action-btn')}>
								<MessageIcon />
							</button>
						</Tippy>

						<Tippy
							content="Hộp thư"
							placement='bottom'
							delays={[0, 200]}
						>
							<button className={cx('action-btn')}>
								<span className={cx('number')}>
									20
								</span>
								<LetterIcon />
							</button>
						</Tippy>
					</>
				) : (
					<>
						<Button text> Upload </Button>
						<Button primary> Log in </Button>

					</>
				)
				}
				<Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange} >
					{currentUser ? (
						<Image
							src="https://p9-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/884d6d4018b9b9b050e8069e772e0009.jpeg?x-expires=1668067200&x-signature=%2FS%2FW5TUqfwfMi%2BIU5kChkSNhvpQ%3D"
							className={cx('user-avatar')}
							alt="Tran Thi Thao"
							fallback="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
						/>
					) : (
						<button className={cx('more-btn')}>
							<FontAwesomeIcon icon={faEllipsisVertical} />
						</button>
					)}
				</Menu>
			</div>

		</div >
	</header >
}

export default Header;