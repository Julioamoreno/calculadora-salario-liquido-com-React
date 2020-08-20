import React from 'react';

import css from './readonly.module.css';

export default function ReadOnly({ description, inputValue }) {
	return (
		<div className="col m6 l3  grey lighten-4 z-depth-3">
			<label className={css.descricao} htmlFor={description}>
				{description}
			</label>
			<input
				className={css.entradas}
				type="text"
				id={description}
				value={inputValue}
				readOnly
			/>
		</div>
	);
}
