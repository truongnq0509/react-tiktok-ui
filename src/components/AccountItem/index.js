import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind'

import styles from './AccountItem.module.scss';

const cx = className.bind(styles)

function AccountItem() {
	return (
		<div className={cx('wrapper')}>
			<img
				className={cx('avatar')}
				src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/12c9e4ba24fbd52cb43e25ab49604ae8~c5_100x100.jpeg?x-expires=1667977200&x-signature=F%2F7hSutxrBVXRRO1AetDtVeRG9M%3D"
				alt="Hoaa"
			/>
			<div className={cx('info')}>
				<h4 className={cx('name')}>
					<span>Tran Thi Thao</span>
					<FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
				</h4>
				<span className={cx('username')}>tranthithao</span>
			</div>
		</div>
	);
}

export default AccountItem;