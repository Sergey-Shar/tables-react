import { FC, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import { BsSortUpAlt, BsSortDown } from "react-icons/bs";

interface SortButtonProps {
	onSorting: MouseEventHandler<HTMLButtonElement>;
	orderSort: string;
}
export const SortButton: FC<SortButtonProps> = ({ onSorting, orderSort }) => {
	return (
		<Button
			variant="light"
			style={{ margin: "0 1rem" }}
			size="sm"
			onClick={onSorting}>
			{orderSort === "asc" ? <BsSortUpAlt /> : <BsSortDown />}
		</Button>
	);
};
