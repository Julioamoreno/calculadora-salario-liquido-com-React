import React, { useState, useEffect } from 'react';
import InputSalario from './components/InputSalary/InputSalary';
import PercentualBar from './components/PercentualBar/PercentualBar';

import { calculateSalaryFrom } from './utils/salary/salary';
import ReadOnly from './components/ReadOnly/ReadOnly';

export default function App() {
	const [baseInss, setBaseInss] = useState(0);
	const [baseIrpf, setBaseIrpf] = useState(0);
	const [descontoIrpf, setDescontoIrpf] = useState(0);
	const [descontoInss, setDescontoInss] = useState(0);
	const [percentualIrpf, setPercentualIrpf] = useState(0);
	const [percentualInss, setPercentualInss] = useState(0);
	const [percentualSalary, setPercentualSalary] = useState(0);
	const [salarioLiquido, setSalarioLiquido] = useState(0);
	//Tooltip bar
	const [positionMouse1, setPositionMouse1] = useState(0);
	const [positionMouse2, setPositionMouse2] = useState(0);
	const [positionMouse3, setPositionMouse3] = useState(0);

	useEffect(() => {
		setPositionMouse1(positionMouse1);
		return () => {
			setPositionMouse1(0);
		};
	}, [positionMouse1]);

	useEffect(() => {
		setPositionMouse2(positionMouse2);
		return () => {
			setPositionMouse2(0);
		};
	}, [positionMouse2]);

	useEffect(() => {
		setPositionMouse3(positionMouse3);
		return () => {
			setPositionMouse3(0);
		};
	}, [positionMouse3]);

	const calculaSalario = salario => {
		let results = calculateSalaryFrom(salario);
		let percentInss,
			percentIrpf,
			percentSalary = 0;

		let {
			baseINSS,
			baseIRPF,
			discountINSS,
			discountIRPF,
			netSalary,
		} = results;

		percentInss = parseFloat(
			((discountINSS / salario) * 100).toFixed(2)
		);
		percentIrpf = parseFloat(
			((discountIRPF / salario) * 100).toFixed(2)
		);
		percentSalary = parseFloat(
			((netSalary / salario) * 100).toFixed(2)
		);

		let number = new Intl.NumberFormat([], {
			style: 'currency',
			currency: 'BRL',
		});

		baseINSS = number.format(baseINSS);
		baseIRPF = number.format(baseIRPF);
		discountINSS = number.format(discountINSS);
		discountIRPF = number.format(discountIRPF);
		netSalary = number.format(netSalary);

		setBaseInss(baseINSS);
		setDescontoInss(`${discountINSS} ( ${percentInss}% )`);
		setBaseIrpf(baseIRPF);
		setDescontoIrpf(`${discountIRPF} ( ${percentIrpf}% )`);
		setSalarioLiquido(`${netSalary} ( ${percentSalary}% )`);
		setPercentualInss(percentInss);
		setPercentualIrpf(percentIrpf);
		setPercentualSalary(percentSalary);
	};

	//Funçao de movimento da descriçao da barra
	const barHover = event => {
		//ver tamanho do navegador
		let ajuste = 325;
		let marginRight1 = 0.95; //diminuiçao do movimento do tooltip no 2º component
		let marginRight2 = 0.85; //diminuiçao do movimento do tooltip no 3º component
		if (window.innerWidth < 825) {
			// verifica o tamanho da janela
			ajuste = 120;
			marginRight1 = 0.77;
			marginRight2 = 0.94;
		} else if (window.innerWidth < 1225) {
			ajuste = 170;
		}
		let ajusteMouse;
		ajusteMouse = event.clientX - ajuste;
		//verificação de qual componente está selecionado
		//e seta o position de acordo
		if (event.target.id === 'primeira') {
			setPositionMouse1(ajusteMouse);
		} else if (event.target.id === 'segunda') {
			setPositionMouse2(ajusteMouse * marginRight1 - positionMouse1);
		} else if (event.target.id === 'terceira') {
			setPositionMouse3(
				ajusteMouse * marginRight2 - (positionMouse1 - positionMouse2)
			);
		}
	};

	const colorINSS = 'red';
	const colorIRPF = '#c0392b';
	const colorSalarioLiquido = 'green';
	return (
		<div className="container striped">
			<h3>Calculadora de Salário Líquido</h3>
			<div className="row">
				<InputSalario salarioBruto={calculaSalario} />
			</div>

			<div className="row">
				<ReadOnly description={'Base INSS'} inputValue={baseInss} />
				<ReadOnly
					description={'Desconto INSS'}
					inputValue={descontoInss}
					color={colorINSS}
				/>
				<ReadOnly description={'Base IRPF'} inputValue={baseIrpf} />
				<ReadOnly
					description={'Desconto IRPF'}
					inputValue={descontoIrpf}
					color={colorIRPF}
				/>
			</div>
			<div className="row">
				<ReadOnly
					description={'Salário Líquido'}
					inputValue={salarioLiquido}
					color={colorSalarioLiquido}
				/>
			</div>
			<div className="padding default-flex-row">
				<PercentualBar
					colorBar={colorSalarioLiquido}
					description={`Salario líquido: ${percentualSalary}%`}
					widthValue={percentualSalary}
					tooltipMoviment={barHover}
					positionTooltip={positionMouse1}
					idBar={'primeira'}
				/>
				<PercentualBar
					colorBar={colorINSS}
					description={`Desconto INSS: ${percentualInss}%`}
					widthValue={percentualInss}
					tooltipMoviment={barHover}
					positionTooltip={positionMouse2}
					idBar={'segunda'}
				/>
				<PercentualBar
					colorBar={colorIRPF}
					description={`Desconto Imposto de renda: ${percentualIrpf}%`}
					widthValue={percentualIrpf}
					tooltipMoviment={barHover}
					positionTooltip={positionMouse3}
					idBar={'terceira'}
				/>
			</div>
		</div>
	);
}
