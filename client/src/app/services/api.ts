import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
export const BASE_URL = process.env.REACT_APP_BASE_URL_API as string;

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
	reducerPath: "app/api",
	baseQuery: baseQueryWithRetry,
	endpoints: () => ({}),
});
