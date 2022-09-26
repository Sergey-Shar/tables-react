import { api } from "./api";
import { IFiltrQueryArgs, IServerResponse, ITableDataSimple } from "./models";

export const filterDataTable = api.injectEndpoints({
	endpoints: (build) => ({
		filterData: build.query<IServerResponse<ITableDataSimple>, IFiltrQueryArgs>(
			{
				query: ({ column, operator, search }) =>
					`table/filter/${column}/${operator}/${search}`,
			}
		),
	}),
});

export const { useFilterDataQuery } = filterDataTable;
