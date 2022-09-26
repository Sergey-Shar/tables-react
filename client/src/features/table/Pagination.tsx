import { useLazyGetDataQuery } from "app/services";
import { useEffect } from "react";
import { Pagination, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import {
	currentPage,
	changeNumberRows,
	setDataTable,
	tottalPages,
	changeCurrentPage,
	catchError,
	setLoading,
} from "./tableSlice";

export const PaginationButtons = () => {
	const [fetchRepos, { data: dataT, isError, isLoading }] =
		useLazyGetDataQuery();

	const dispatch = useAppDispatch();
	const tottalRowCount = useAppSelector(tottalPages);
	const currentPageNum = useAppSelector(currentPage);

	useEffect(() => {
		!isLoading && dispatch(setDataTable(dataT?.data!));
		isError && catchError(true)
	}, [dataT?.data, dispatch, isError, isLoading]);

	useEffect(() => {
		if (isLoading) {
			setLoading(true)
		}
	},[isLoading])

	const onChangePage = (event: React.MouseEvent<HTMLUListElement>) => {
		fetchRepos({ page: event.currentTarget.id, limit: "10" });
		dispatch(changeCurrentPage(Number(event.currentTarget.id)));
	};

	const handleChangePageSize = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		fetchRepos({
			page: String(currentPageNum),
			limit: event.currentTarget.value,
		});
		dispatch(changeNumberRows(Number(event.currentTarget.value)));
	};

	return (
		<>
			<Pagination size="sm">
				{tottalRowCount?.map((num: any, index: any) => {
					return (
						<Pagination.Item
							id={String(num)}
							active={currentPageNum === index + 1}
							onClick={onChangePage}
							key={num}>
							{num}
						</Pagination.Item>
					);
				})}
			</Pagination>
			<div style={{ marginLeft: "1rem" }}>
				<Form.Select
					className="select-perpage"
					defaultValue={10}
					size="sm"
					onChange={handleChangePageSize}>
					<option value="1">1</option>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
				</Form.Select>
			</div>
		</>
	);
};
