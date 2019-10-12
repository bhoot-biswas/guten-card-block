/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	RichText,
	InnerBlocks,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	IMAGE_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
	backgroundImageStyles,
	dimRatioToClass,
} from './shared';

export default function save( { attributes } ) {
	const {
		backgroundType,
		customOverlayColor,
		dimRatio,
		focalPoint,
		hasParallax,
		overlayColor,
		url,
		minHeight,
		showTitle,
		cardTitle,
		customTextColor,
		backgroundColor,
		customBackgroundColor,
		className,
		mediaPosition,
	} = attributes;
	const overlayColorClass = getColorClassName( 'background-color', overlayColor );
	const mediaStyles = backgroundType === IMAGE_BACKGROUND_TYPE ?
		backgroundImageStyles( url ) :
		{};
	if ( ! overlayColorClass ) {
		mediaStyles.backgroundColor = customOverlayColor;
	}
	if ( focalPoint && ! hasParallax ) {
		mediaStyles.backgroundPosition = `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`;
	}
	mediaStyles.minHeight = minHeight || undefined;

	const mediaClasses = classnames(
		'wp-block-bengal-studio-card__img-top',
		dimRatioToClass( dimRatio ),
		overlayColorClass,
		{
			'has-background-dim': dimRatio !== 0,
			'has-parallax': hasParallax,
		},
	);

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const cardClasses = classnames(
		className,
		{
			[backgroundClass]: backgroundClass,
			[ `wp-block-bengal-studio-card--media-position-${ mediaPosition }` ]: true,
		}
	)

	const cardStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: customTextColor ? customTextColor : undefined,
	}

	return (
		<div className={ cardClasses ? cardClasses : undefined } style={ cardStyles }>
			{ IMAGE_BACKGROUND_TYPE === backgroundType && (
				<div
					className={ mediaClasses }
					data-url={ url }
					style={ mediaStyles }
				>
					{ showTitle && (
						<RichText.Content
							tagName="h2"
							value={ cardTitle }
							className="wp-block-bengal-studio-card__title"
						/>
					) }
				</div>
			) }
			{ VIDEO_BACKGROUND_TYPE === backgroundType && url && ( <video
				className="wp-block-bengal-studio-card__video-background"
				autoPlay
				muted
				loop
				src={ url }
			/> ) }
			<div className="wp-block-bengal-studio-card__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
