import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction("api/Request");
export const apiSuccess = createAction("api/Success");
export const apiFailure = createAction("api/Failure");
