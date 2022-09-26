import { Alert, CloseButton } from "react-bootstrap";

export const BaseAlert = ({
	variant,
	text,
	onClick,
}: {
	variant: string;
	text: string;
	onClick: () => void;
}) => {
	return (
		<Alert
			style={{ position: "absolute", top: "2rem", width: "30%" }}
			key={variant}
			variant={variant}>
			{text}
			<CloseButton
				style={{ position: "absolute", right: "1rem" }}
				onClick={onClick}
			/>
		</Alert>
	);
};
