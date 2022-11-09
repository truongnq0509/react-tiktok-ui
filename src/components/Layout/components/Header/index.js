import { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleXmark, faCloudUpload, faCoins, faEarthAmerica, faEllipsisVertical, faGear, faKeyboard, faMagnifyingGlass, faMessage, faSign, faSignOut, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './Header.module.scss'
import images from '~/assets/images'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { LetterIcon, SearchIcon, UploadIcon, MessageIcon } from '~/components/Icons'
import Image from '~/components/Image'


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
	const [searchResult, setSearchResult] = useState([])
	const currentUser = true


	useEffect(() => {
		setTimeout(() => {
			setSearchResult([])
		}, 0)
	}, [])

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
			<img
				src={images.logo}
				alt="TikTok"
			/>
			<HeadlessTippy
				interactive
				visible={searchResult.length > 0}
				render={attrs => (
					<div className={cx('search-result')} tabIndex="-1" {...attrs}>
						<PopperWrapper>
							<h4 className={cx('search-title')}>
								Accounts
							</h4>
							<AccountItem />
							<AccountItem />
							<AccountItem />
						</PopperWrapper>
					</div>
				)}
			>
				<div className={cx('search')}>
					<input
						placeholder='Seacrch accounts and videos'
						spellCheck={false}
					/>
					<button className={cx('clear')}>
						{/*Close*/}
						<FontAwesomeIcon icon={faCircleXmark} />
					</button>
					{/* Loading */}
					<FontAwesomeIcon className={cx('loading')} icon={faSpinner} />


					<button className={cx('search-btn')}>
						{/* Search */}
						<SearchIcon
							width='2.4rem'
							height='2.4rem'
						/>
					</button>
				</div>
			</HeadlessTippy>


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