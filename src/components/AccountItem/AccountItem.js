import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import className from 'classnames/bind'
import Image from '~/components/Image'

import styles from './AccountItem.module.scss';

const cx = className.bind(styles)

function AccountItem({ data }) {
	return (
		<Link to={`/@${data.username}`} className={cx('wrapper')}>
			<Image
				className={cx('avatar')}
				src={data.avatar}
				alt={data.full_name}
			/>
			<div className={cx('info')}>
				<h4 className={cx('name')}>
					<span>{data.full_name}</span>
					{data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}

				</h4>
				<span className={cx('username')}>{data.nickname}</span>
			</div>
		</Link>
	);
}

AccountItem.prototype = {
	data: PropTypes.object.isRequired
}

export default AccountItem;