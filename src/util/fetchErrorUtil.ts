import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export function isNetworkError(error:FetchBaseQueryError)
{
return error.status == "FETCH_ERROR";
}