import React from 'react';

import css from './percentualbar.module.css';

export default function PercentualBar({
	colorBar,
	description,
	widthValue,
	idBar,
	tooltipMoviment,
	positionTooltip,
}) {
	return (
		<div
			className={css.tooltip}
			id={idBar}
			style={{
				marginTop: '40px',
				width: widthValue + '%',
				height: '20px',
				backgroundColor: colorBar,
			}}
			onMouseMove={tooltipMoviment}
		>
			<span
				className={css.tooltiptext}
				style={{
					marginLeft: positionTooltip + 'px',
					backgroundColor: colorBar,
				}}
			>
				{description}
			</span>
		</div>
	);
}
