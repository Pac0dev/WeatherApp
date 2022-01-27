import BarComponent from "../bar/BarComponent";
import navigation_white_24dp from "../../assets/icons/navigation_white_24dp.svg";

const DetailedCard = ({ title, number, symbol }) => {
	const whatWillRender = () => {
		switch (symbol) {
			case "mph":
				return (
					<span className="wind">
						<img
							className="nav-img"
							src={navigation_white_24dp}
							alt="nav"
						/>
						WSW
					</span>
				);
			case "%":
				return <BarComponent percent={number} />;
			default:
				return null;
		}
	};
	return (
		<div className="detailed-card">
			<p className="detailed-card__text fs-smallest">{title}</p>
			<div className="detailed-card__mid">
				{Math.round(number)}
				<span>{symbol}</span>
			</div>
			<div className="detailed-card__footer">{whatWillRender()}</div>
		</div>
	);
};

export default DetailedCard;
