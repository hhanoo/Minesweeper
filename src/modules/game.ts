import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface gameSetting {
  row: number;
  col: number;
  bomb: number;
  bestTime: number;
  duringTime: number;
}

export interface gameType {
  row: number;
  col: number;
  bomb: number;
}

const initialState: gameSetting = {
  row: 8, // height
  col: 8, // width
  bomb: 10,
  bestTime: 999,
  duringTime: 999,
};

const gameSlice = createSlice({
  name: "gameSetting",
  initialState,
  reducers: {
    SETTING: (state, action: PayloadAction<gameType>) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
      state.bomb = action.payload.bomb;
    },
    BEST_TIME: (state, action: PayloadAction<number>) => {
      state.bestTime = action.payload;
    },
    DURING_TIME: (state, action: PayloadAction<number>) => {
      state.duringTime = action.payload;
    },
  },
});

export const { SETTING, BEST_TIME, DURING_TIME } = gameSlice.actions;
export default gameSlice.reducer;
