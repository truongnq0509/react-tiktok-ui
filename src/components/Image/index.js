import { useState, forwardRef } from 'react'
import classNames from 'classnames'
import images from '~/assets/images'
import styles from './Image.module.scss'


const Image = forwardRef(({ src, className, fallback: customFallback = images.noImage, ...props }, ref) => {
	const [fallback, setFallback] = useState('')

	const handleError = () => {
		setFallback(customFallback)
	}



	return (
		<img
			className={classNames(styles.wrapper, className)}
			ref={ref}
			{...props}
			src={fallback || src}
			onError={handleError}
		/>
	)
})

export default Image;