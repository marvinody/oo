import { CCWdeg, CWdeg } from './directions';
import game_maker, { isGameSolved } from "./game_maker";
const LOAD_GAME = 'LOAD_GAME'
const ROTATE_PIECE = 'ROTATE_PIECE'
const ROTATE_PIECE_TO_ANGLE = 'ROTATE_PIECE_TO_ANGLE'

const initialState = {
  board: game_maker(`
  LTL
  T+T
  TTT
  | |
  O O`),
  solved: false,
}


export const getGame = () => dispatch => {
  const game = initialState
  dispatch({
    type: 'LOAD_GAME',
    game,
  })
}

export const solveGame = () => dispatch => {
  dispatch()
}

export const rotatePieceTo = (piece, rotation) => ({
  type: ROTATE_PIECE_TO_ANGLE,
  piece,
  rotation,
})

export const rotatePiece = (piece, isCW) => ({
  type: ROTATE_PIECE,
  isCW,
  piece,
})




export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return { ...state, ...action.game }
    case ROTATE_PIECE:
      if (state.solved) {
        return state;
      }
      const board = state.board.map(row => row.map(piece => {
        if (piece.row !== action.piece.row || piece.col !== action.piece.col) {
          return piece
        }
        return { ...piece, dir: action.isCW ? CWdeg(piece.dir) : CCWdeg(piece.dir) }
      }))
      return {
        ...state, board,
        solved: isGameSolved(board),
      }
    default:
      return state
  }
}
