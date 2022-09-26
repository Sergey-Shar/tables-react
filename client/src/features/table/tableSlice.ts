import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IServerResponse } from "app/services";

interface TableState {
	numberOfRows: number;
	currentPageTable: number;
	totallPages: number[];
	tableData: any;
	isShowAlert: boolean
	isError: boolean
	isLoading:boolean
}

const initialState: TableState = {
	numberOfRows: 10,
	currentPageTable: 1,
	totallPages: [1, 2],
	tableData: [],
	isShowAlert: false,
	isError: false,
	isLoading:false
};

export const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		changeNumberRows: (state, action: PayloadAction<number>) => {
			state.numberOfRows = action.payload;
		},
		changeCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPageTable = action.payload;
		},
		setTottalPage: (state, action: PayloadAction<number[]>) => {
			state.totallPages = action.payload;
		},
		setDataTable: (
			state,
			action: PayloadAction<IServerResponse<any>>
		) => {
			state.tableData = action.payload;
		},
		setShowAlert: (state, action: PayloadAction<boolean>) => {
			state.isShowAlert = action.payload
		},
		catchError: (state, action: PayloadAction<boolean>) => {
			state.isError = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		}
	},
});

export const {
	changeNumberRows,
	changeCurrentPage,
	setTottalPage,
	setDataTable,
	setShowAlert,
	catchError,
	setLoading,
} = tableSlice.actions;

export const currentPage = (state: RootState) => state.table.currentPageTable;
export const numRows = (state: RootState) => state.table.numberOfRows;
export const tottalPages = (state: RootState) => state.table.totallPages;
export const dataTable = (state: RootState) => state.table.tableData;
export const showAlert = (state: RootState) => state.table.isShowAlert;
export const error = (state: RootState) => state.table.isError;
export const loading = (state: RootState) => state.table.isLoading;

export default tableSlice.reducer;
