import { api } from "./api";
import { IQueryArgs, IServerResponse, ITableData } from "./models";
interface I {
	page: string;
	limit: string;
}
export const getDataForTable = api.injectEndpoints({
	endpoints: (build) => ({
		getData: build.query<ITableData, IQueryArgs>({
			query: ({ page, limit }) => `table/?page=${page}&limit=${limit}`,
		}),
	}),
});

export const { useGetDataQuery, useLazyGetDataQuery } = getDataForTable;
