import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface statusType {
  isStatus: number;
  isReset: boolean;
  isStart: boolean;
  isDeath: boolean;
  isSuccess: boolean;
}

interface remainType {
  remain: number;
}

const initialState: statusType = {
  isStatus: 0,
  isReset: false,
  isStart: false,
  isDeath: false,
  isSuccess: false,
};

const statusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    RESET: (state) => {
      state.isStatus = 0;
      state.isReset = true;
      state.isStart = false;
      state.isDeath = false;
      state.isSuccess = false;
    },
    RESET_COMPLETE: (state) => {
      state.isReset = false;
    },
    START: (state) => {
      state.isStart = true;
    },
    DEATH: (state) => {
      state.isDeath = true;
    },
    STATUS_UPDATE: (state, action: PayloadAction<remainType>) => {
      state.isStatus = action.payload.remain;
    },
    SUCCESS: (state) => {
      state.isSuccess = true;
    },
  },
});

export const { RESET, RESET_COMPLETE, START, DEATH, STATUS_UPDATE, SUCCESS } =
  statusSlice.actions;
export default statusSlice.reducer;
