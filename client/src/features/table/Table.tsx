import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PaginationButtons } from "./Pagination";
import "./style.css";
import { useGetDataQuery, useLazySortDataQuery } from "app/services";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import {
	catchError,
	currentPage,
	dataTable,
	error,
	loading,
	numRows,
	setDataTable,
	setLoading,
	setShowAlert,
	setTottalPage,
	showAlert,
} from "./tableSlice";
import { SortButton } from "./SortButton";
import { FilterSelect } from "./FilterSelect";
import { BaseAlert } from "shared/ui";

export const MainTable = () => {
	const [orderSort, setOrderSort] = useState("asc");
	const dispatch = useAppDispatch();
	const currentData = useAppSelector(dataTable);
	const currentLimit = useAppSelector(numRows);
	const currentPageNum = useAppSelector(currentPage);
	const isShowAlert = useAppSelector(showAlert);
	const isHTTPError = useAppSelector(error);
	const loadingData = useAppSelector(loading);

	const {
		isError,
		isLoading,
		data: dataT,
	} = useGetDataQuery({ page: "1", limit: "10" });

	const [
		fetchRepos,
		{ isError: isErrSort, isLoading: isLoadSort, data: dataSort },
	] = useLazySortDataQuery();

	useEffect(() => {
		if (!isLoading) {
			dispatch(setDataTable(dataT?.data!));
			dispatch(setTottalPage(dataT?.length!));
		}
		isError && catchError(true);
	}, [dataT?.data, dataT?.length, dispatch, isError, isLoading]);

	useEffect(() => {
		if (dataSort) {
			dispatch(setDataTable(dataSort));
		}
		isErrSort && catchError(true);
	}, [dataSort, dispatch, isErrSort]);

	useEffect(() => {
		if (isLoading || isLoadSort) {
			setLoading(true);
		}
	}, [isLoadSort, isLoading]);

	const onSorting = (field: string) => {
		orderSort === "asc" ? setOrderSort("desc") : setOrderSort("asc");
		fetchRepos({
			field,
			order: orderSort,
			page: String(currentPageNum),
			limit: String(currentLimit),
		});
	};

	return (
		<div className="table-wrapper">
			<div className="table-header">
				<FilterSelect />
			</div>
			<div className="main-table">
				{isShowAlert && (
					<BaseAlert
						variant="info"
						text="По запросу ничего не найдено"
						onClick={() => dispatch(setShowAlert(false))}
					/>
				)}
				{isHTTPError && (
					<BaseAlert
						variant="error"
						text="Уппс, что то пошло не так..."
						onClick={() => dispatch(setShowAlert(false))}
					/>
				)}
				{!loadingData ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Дата</th>
								<th>
									Название
									<SortButton
										onSorting={() => onSorting("name")}
										orderSort={orderSort}
									/>
								</th>
								<th>
									Количество
									<SortButton
										onSorting={() => onSorting("amount")}
										orderSort={orderSort}
									/>
								</th>
								<th>
									Расстояние
									<SortButton
										onSorting={() => onSorting("distance")}
										orderSort={orderSort}
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{currentData?.map((i: any) => {
								return (
									<tr key={i.id}>
										<td>{i.date}</td>
										<td>{i.name}</td>
										<td>{i.amount}</td>
										<td>{i.distance}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				) : (
					<span>Loading...</span>
				)}
			</div>
			<div className="table-footer">
				<PaginationButtons />
			</div>
		</div>
	);
};
