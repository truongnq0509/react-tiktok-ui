import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles)

function Button({
	to,
	href,
	onClick,
	primary,
	children = false,
	outline = false,
	text = false,
	disabled = false,
	small = false,
	rounded = false,
	big = false,
	className,
	leftIcon,
	rightIcon,
	...passProps }) {

	let Comp = 'button'
	const props = {
		onClick,
		...passProps
	}

	if (to) {
		props.to = to
		Comp = Link
	} else if (href) {
		props.href = href
		Comp = 'a'
	}

	// Xóa sự kiện khi nút bị disabled
	if (disabled) {
		Object.keys(props).forEach(key => {
			if (key.startsWith('on') && typeof props[key] === 'function') {
				delete props[key];
			}
		})
	}

	const classes = cx('wrapper', {
		[className]: className,
		primary,
		outline,
		small,
		big,
		text,
		disabled,
		rounded
	})
	return (
		<Comp className={classes} {...props}>
			{leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
			<span className={cx('title')}>{children}</span>
			{rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
		</Comp >
	);
}

Button.propTypes = {
	to: PropTypes.string,
	href: PropTypes.string,
	outline: PropTypes.string,
	primary: PropTypes.bool,
	text: PropTypes.bool,
	disabled: PropTypes.bool,
	rounded: PropTypes.bool,
	small: PropTypes.bool,
	big: PropTypes.bool,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	leftIcon: PropTypes.node,
	rightIcon: PropTypes.node,
	onClick: PropTypes.func,
}

export default Button;