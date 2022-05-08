import { createSlice } from "@reduxjs/toolkit";

let dynamicID = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++dynamicID,
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
