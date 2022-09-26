export interface ITableData {
	data: {
		id: number;
		date: string;
		name: string;
		amount: number;
		distance: string;
	};
	length: number[];
}

export interface ITableDataSimple {
	length: any;
	id: number;
	date: string;
	name: string;
	amount: number;
	distance: string;
}

export type IServerResponse<T> = T;

export interface IQueryArgs {
	page: string;
	limit: string;
}

export interface ISortQueryArgs {
	field: string;
	order: string;
	page: string;
	limit: string;
}

export interface IFiltrQueryArgs {
	column: string;
	operator: string;
	search: string;
}
