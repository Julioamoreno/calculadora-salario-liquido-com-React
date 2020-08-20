import React, { useState, useEffect } from 'react';

export default function InputSalary({ salarioBruto }) {
	const [salario, setSalario] = useState(1000);

	useEffect(() => {
		salarioBruto(salario);
	}, [salario, salarioBruto]);

	const changeSalario = event => {
		let salarioDigitado = event.target.value;
		setSalario(salarioDigitado);
	};

	return (
		<div>
			<label htmlFor="salario">Digite o Salário Bruto:</label>
			<input
				type="text"
				id="salario"
				onChange={changeSalario}
				value={salario}
			/>
		</div>
	);
}
