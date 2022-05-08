import { createSlice } from "@reduxjs/toolkit";

let dynamicID = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++dynamicID,
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
