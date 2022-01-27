import React from "react";

const BarComponent = ({ percent }) => {
	return (
		<>
			<div className="bar__percents">
				<span> 0</span>
				<span> 50</span>
				<span> 100</span>
			</div>
			<div className="bar">
		<span style={{
			width: `${percent}%`
		}}className="span-progress"></span>
			</div>
			<span className="percent-symb">%</span>
		</>
	);
};

export default BarComponent;
