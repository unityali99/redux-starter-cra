//#region
//Just simplified our code by migrating everything in one file (Here we called it bugs.js)

// Action Types
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// Action Creators
// export function bugAdded(description) {
//   return {
//     type: BUG_ADDED,
//     payload: {
//       description,
//     },
//   };
// }

// export function bugRemoved(id) {
//   return {
//     type: BUG_REMOVED,
//     payload: {
//       id,
//     },
//   };
// }

// export function bugResolved(id) {
//   return {
//     type: BUG_RESOLVED,
//     payload: {
//       id,
//     },
//   };
// }

// let dynamicID = 0;

// // Reducer
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case BUG_ADDED:
//       return [
//         ...state,
//         {
//           id: ++dynamicID,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case BUG_REMOVED:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case BUG_RESOLVED:
//       return state.map((bug) =>
//         bug.id === action.payload.id ? { ...bug, resolved: !bug.resolved } : bug
//       );

//     default:
//       return state;
//   }
// }

// Code above is our first way and is NOT associated with redux toolkit

//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

// // Code below is our second way and its associated with redux toolkit and its BETTER!

// import { createAction, createReducer } from "@reduxjs/toolkit";

// // Action Creators
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // Reducer
// let dynamicID = 0;
// export default createReducer([], {
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++dynamicID,
//       description: action.payload.description,
//       resolved: action.payload.resolved,
//     });
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = action.payload.id - 1;
//     bugs[index].resolved = !bugs[index].resolved;
//   },
// });

//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//#endregion

// Code below is our third way and its the best

import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createSelector } from "reselect";
import * as apiActions from "./actionCreators/api";

// Slice Function
// let dynamicID = 0;
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetched: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = action.payload.id - 1;
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      const index = action.payload.id - 1;
      bugs.list.splice(index);
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetched = Date.now();
    },
    BuglinkedToUser: (bugs, action) => {
      const index = action.payload.id - 1;
      bugs.list[index].userId = action.payload.userId;
    },
    bugsRequested: (bugs) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs) => {
      bugs.loading = false;
    },
  },
});

export default slice.reducer;

//temp
export const actions = slice.actions;

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => bug.resolved === false)
);

export const getBugsByUserId = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((item) => item.userId === userId)
  );

let url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetched } = getState().entities.bugs;
  const diffInSeconds = moment().diff(moment(lastFetched), "seconds");
  if (diffInSeconds < 5) return;
  return dispatch(
    apiActions.apiRequest({
      url,
      onStart: slice.actions.bugsRequested.type,
      onSuccess: slice.actions.bugsReceived.type,
      onFailure: slice.actions.bugsRequestFailed.type,
    })
  );
};

export const addBugs = (bug) =>
  apiActions.apiRequest({
    url,
    method: "post",
    data: bug,
    onSuccess: slice.actions.bugAdded.type,
  });

export const resolveBug = (id) =>
  apiActions.apiRequest({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: slice.actions.bugResolved.type,
  });

export const linkBugToUser = (id, userId) =>
  apiActions.apiRequest({
    url: url + "/" + id,
    method: "patch",
    data: { userId: userId },
    onSuccess: slice.actions.BuglinkedToUser.type,
  });
