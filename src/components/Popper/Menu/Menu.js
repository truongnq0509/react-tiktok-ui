import PropTypes from 'prop-types';
import { useState } from 'react'
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "~/components/Popper"
import MenuItem from './MenuItem'
import Header from "./Header";
import styles from './Menu.module.scss';


const cx = classNames.bind(styles)

const defaultFn = () => { }


function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {

	const [history, setHistory] = useState([{ data: items }])
	const current = history[history.length - 1]

	const renderItems = () => (
		current.data.map((item, index) => {
			const isParent = !!item.children

			return <MenuItem
				key={index}
				data={item}
				onClick={() => {
					if (isParent) {
						setHistory(prevHistory => [...prevHistory, item.children])
					} else {
						onChange(item)
					}
				}} />
		})
	)

	const handleBack = () => {
		setHistory(prev => prev.splice(prev.length - 1), 1)
	}

	const renderResult = attrs => (
		<div className={cx('menu-list')} tabIndex="-1" {...attrs}>
			<PopperWrapper className={cx('menu-popper')}>
				{history.length > 1 && <Header title={current.title} onBack={handleBack} />}
				<div className={cx('menu-body')}>{renderItems()}</div>
			</PopperWrapper>
		</div>
	)

	// Reset to frist page
	const handleResetMenu = () => {
		setHistory(prev => prev.slice(0, 1))
	}

	return (<Tippy
		interactive
		delay={[0, 700]}
		hideOnClick={hideOnClick}
		placement="bottom-end"
		offset={[10, 10]}
		render={renderResult}
		onHide={handleResetMenu}
	>
		{children}
	</Tippy>);
}

Menu.propTypes = {
	children: PropTypes.node.isRequired,
	items: PropTypes.array,
	hideOnClick: PropTypes.bool,
	onChange: PropTypes.func,
}

export default Menu;