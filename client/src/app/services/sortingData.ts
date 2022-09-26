import { api } from "./api";
import { IServerResponse, ISortQueryArgs, ITableData } from "./models";

export const sortingDataTable = api.injectEndpoints({
    endpoints: (build) => ({
        sortData: build.query<IServerResponse<ITableData>, ISortQueryArgs >({
        query: ({ field, order, page, limit }) => `table/sorting/${field}/${order}?page=${page}&limit=${limit}`,
    })
})
})

export const {useLazySortDataQuery} = sortingDataTable