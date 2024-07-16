import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LineProps = {
  color: string;
  lineWidth: number;
  lineAlpha: number;
};

type Point = {
  x: number;
  y: number;
  canvasWidth: number;
  canvasHeight: number;
  lineProps?: LineProps;
};

export type Path = Point[];

interface CanvasState {
  paths: Path[];
  undonePaths: Path[];
  lineWidth: number;
  lineAlpha: number;
  color: string;
  isDrawing: boolean;
  eraseMode: boolean;
  modalIsOpen: boolean;
}

const initialState: CanvasState = {
  paths: [],
  undonePaths: [],
  lineWidth: 3,
  lineAlpha: 10,
  color: '#222222',
  isDrawing: false,
  eraseMode: false,
  modalIsOpen: false
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    startDrawing(state, action: PayloadAction<Point>) {
      state.paths.push([action.payload]);
      state.isDrawing = true;
    },
    draw: (state, action: PayloadAction<Point>) => {
        if (state.isDrawing) {
          const lastPath = state.paths[state.paths.length - 1];
          if (lastPath) {
            lastPath.push(action.payload);
          }
        }
    },
    stopDrawing(state) {
      state.isDrawing = false;
    },
    setLineWidth(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload;
    },
    setLineAlpha(state, action: PayloadAction<number>) {
      state.lineAlpha = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    setEraseMode(state, action: PayloadAction<boolean>) {
      state.eraseMode = action.payload;
    },
    clearPaths(state) {
      state.paths = [];
      state.undonePaths = [];
    },
    undo(state) {
      const lastPath = state.paths.pop();
      if (lastPath) {
        state.undonePaths.push(lastPath);
      }
    },
    redo(state) {
      const lastUndonePath = state.undonePaths.pop();
      if (lastUndonePath) {
        state.paths.push(lastUndonePath);
      }
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
        state.modalIsOpen = action.payload;
    }
  },
});

export const {
  startDrawing,
  draw,
  stopDrawing,
  setLineWidth,
  setLineAlpha,
  setColor,
  setEraseMode,
  clearPaths,
  undo,
  redo,
  setModalOpen
} = canvasSlice.actions;

export default canvasSlice.reducer;
