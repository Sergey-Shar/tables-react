import { useFilterDataQuery } from "app/services/filterData";
import { useEffect, useState } from "react";
import {
	Button,
	CloseButton,
	Form,
	OverlayTrigger,
	Popover,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector, useDebounce } from "shared";
import {
	catchError,
	currentPage,
	setDataTable,
	setLoading,
	setShowAlert,
} from "./tableSlice";
import "./style.css";
import { useLazyGetDataQuery } from "app/services";

export const FilterSelect = () => {
	const [column, setColumn] = useState("");
	const [operator, setOperator] = useState("");
	const [search, setSearch] = useState("");
	const debounced = useDebounce(search, 1000);
	const dispatch = useAppDispatch();
	const currentPageNum = useAppSelector(currentPage);

	const { data: filterData, isError: errorLoading } = useFilterDataQuery(
		{ column, operator, search: debounced },
		{
			skip: column.length < 2 || operator.length < 1 || debounced.length < 1,
		}
	);

	const [fetchRepos, { data: dataT, isError, isLoading }] =
		useLazyGetDataQuery();

	useEffect(() => {
		!isLoading && dispatch(setDataTable(dataT?.data!));
		isError && catchError(true);
	}, [dataT?.data, dispatch, isError, isLoading]);

	useEffect(() => {
		if (filterData) {
			if (filterData.length) {
				dispatch(setDataTable(filterData));
			} else {
				dispatch(setShowAlert(true));
			}
		}
		errorLoading && catchError(true);
	}, [dispatch, errorLoading, filterData]);

	useEffect(() => {
		if (errorLoading || isLoading) {
			setLoading(true);
		}
	},[errorLoading, isLoading]);

	const changeColumnFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColumn(event.currentTarget.value);
	};

	const changeOperatorFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setOperator(event.currentTarget.value);
	};

	const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.currentTarget.value);
	};

	const resetFilterData = () => {
		fetchRepos({ page: String(currentPageNum), limit: "10" });
		dispatch(setShowAlert(false));
	};
	const popover = (
		<Popover id="popover-contained">
			<Popover.Header as="h3">
				<CloseButton
					style={{ marginRight: "1rem" }}
					onClick={resetFilterData}
				/>
				????????????????
			</Popover.Header>
			<Popover.Body className="filter-popup">
				<Form.Select
					style={{ margin: "0.3rem" }}
					aria-label="Default select example"
					onChange={changeColumnFilter}>
					<option>??????????????</option>
					<option value="name">????????????????</option>
					<option value="amount ">????????????????????</option>
					<option value="distance">????????????????????</option>
				</Form.Select>
				<Form.Select
					style={{ margin: "0.3rem" }}
					aria-label="Default select example"
					onChange={changeOperatorFilter}>
					<option>????????????????</option>
					<option value="=">??????????</option>
					<option value=">">????????????</option>
					<option value="<">????????????</option>
				</Form.Select>

				<Form.Control
					style={{ margin: "0.3rem" }}
					aria-label="Small"
					aria-describedby="inputGroup-sizing-sm"
					onChange={changeInputValue}
				/>
			</Popover.Body>
		</Popover>
	);

	return (
		<OverlayTrigger trigger="click" placement="left-end" overlay={popover}>
			<Button size="sm">????????????</Button>
		</OverlayTrigger>
	);
};
