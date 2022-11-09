import { useState } from 'react'
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "~/components/Popper"
import MenuItem from './MenuItem'
import Header from "./Header";
import styles from './Menu.module.scss';


const cx = classNames.bind(styles)

const defaultFn = () => { }


function Menu({ children, items = [], onChange = defaultFn }) {

	const [history, setHistory] = useState([{ data: items }])
	const current = history[history.length - 1]

	const renderItems = () => (
		current.data.map((item, index) => {
			const isParent = !!item.children

			return <MenuItem key={index} data={item} onClick={() => {
				if (isParent) {
					setHistory(prevHistory => [...prevHistory, item.children])
				} else {
					onChange(item)
				}
			}} />
		})
	)
	return (<Tippy
		interactive
		delay={[0, 700]}
		placement="bottom-end"
		offset={[10, 10]}
		render={attrs => (
			<div className={cx('menu-list')} tabIndex="-1" {...attrs}>
				<PopperWrapper className={cx('menu-popper')}>
					{history.length > 1 && <Header title="Language" onBack={() => {
						setHistory(prev => prev.splice(prev.length - 1), 1)
					}} />}
					{renderItems()}
				</PopperWrapper>
			</div>
		)}
		onHide={() => setHistory(prev => prev.slice(0, 1))}
	>
		{children}
	</Tippy>);
}

export default Menu;