import { useState, useEffect, useRef } from 'react'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchService from '~/apiServices/searchServices'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss'

const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([])
	const [showResults, setShowResult] = useState(true)
	const [loading, setLoading] = useState(false)

	const inputRef = useRef()

	const debounced = useDebounce(searchValue, 500)


	useEffect(() => {
		if (!debounced.trim()) {
			setSearchResult([])
			return;
		}

		setLoading(true)

		const fetchApi = async () => {
			setLoading(true)

			const result = await searchService.search(debounced)
			setSearchResult(result)

			setLoading(false)
		}

		fetchApi()


	}, [debounced])

	const handleClear = () => {
		setSearchValue('')
		setSearchResult([])
		inputRef.current.focus()
	}

	const handleHideResult = () => {
		setShowResult(false)
	}

	return (
		<HeadlessTippy
			interactive
			visible={showResults && searchResult.length > 0}
			render={attrs => (
				<div className={cx('search-result')} tabIndex="-1" {...attrs}>
					<PopperWrapper>
						<h4 className={cx('search-title')}>
							Accounts
						</h4>
						{searchResult.map(result => (
							<AccountItem key={result.id} data={result} />
						))}
					</PopperWrapper>
				</div>
			)}
			onClickOutside={handleHideResult}
		>
			<div className={cx('search')}>
				<input
					ref={inputRef}
					value={searchValue}
					placeholder='Seacrch accounts and videos'
					spellCheck={false}
					onChange={e => setSearchValue(e.target.value)}
					onFocus={() => setShowResult(true)}
				/>
				{!!searchValue && !loading && (
					<button
						className={cx('clear')}
						onClick={handleClear}
					>
						{/*Close*/}
						<FontAwesomeIcon icon={faCircleXmark} />
					</button>
				)}
				{/* Loading */}
				{loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}


				<button className={cx('search-btn')}>
					{/* Search */}
					<SearchIcon
						width='2.4rem'
						height='2.4rem'
					/>
				</button>
			</div>
		</HeadlessTippy>
	)
}

export default Search;