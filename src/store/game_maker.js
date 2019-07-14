import { EAST, NORTH, OPP, SOUTH, WEST } from './directions';


export const EMPTY = 'EMPTY'
export const TERMINAL = 'TERMINAL'
export const PIPE = 'PIPE'
export const ANGLED = 'ANGLED'
export const THREE_WAY = 'THREE_WAY'
export const FOUR_WAY = 'FOUR_WAY'


export const CWdeg = dir => {
  return (dir + 90)
}
export const CCWdeg = dir => {
  return (dir - 90)
}

const charToToken = char => {
  switch (char) {
    case 'O':
      return TERMINAL;
    case '|':
      return PIPE
    case 'L':
      return ANGLED;
    case 'T':
      return THREE_WAY;
    case '+':
      return FOUR_WAY;
    default:
      return EMPTY;
  }
}

const getNeighbors = (board, col, row) => {
  return [
    [-1, 0], [+1, 0],
    [0, -1], [0, +1],
  ].map(p => [col + p[0], [row + p[1]]])
    .filter(p => board[p[0]]) // check if col exists
    .filter(p => board[p[0]][p[1]]) // check if col,row exists
    .map(p => board[p[0]][p[1]])
}
// returns direction of how to get to p2 from p1
const getDirFromPoints = (p1, p2) => {
  const
    colDiff = p2.col - p1.col,
    rowDiff = p2.row - p2.row;

  if (rowDiff === 0 && colDiff === 1) {
    return SOUTH; // p2 is south of p1
  } else if (rowDiff === 0 && colDiff === -1) {
    return NORTH;
  } else if (rowDiff === 1 && colDiff === 0) {
    return EAST;
  } else if (rowDiff === -1 && colDiff === 0) {
    return WEST;
  } else {
    throw new Error(`INVALID NEIGHBORS: p1: ${p1}  p2: ${p2}`)
  }
}

// returns an array of out dirs
const getOutgoingDirections = piece => {

}

// check if two pieces have a connection to each other
const haveConnection = (piece1, piece2) => {
  const p2DirFromp1 = getDirFromPoints(piece1, piece2);
  const p1DirFromp2 = OPP(p2DirFromp1);
  const dirsFromp1 = getOutgoingDirections(piece1);
  const dirsFromp2 = getOutgoingDirections(piece2);

  return dirsFromp1.includes(p2DirFromp1) && dirsFromp2.includes(p1DirFromp2);

}

export const isGameSolved = board => {
  // for each piece in the board
  // check if everyone has a connection to another piece
  // every will stop iterating early if not everything fits
  return board.every((line, col) => line.every((piece, row) => {
    const neighbors = getNeighbors(board, col, row);
    return neighbors.every(n => haveConnection(piece, n))
  }))
}

export default (str) => {
  return str.split('\n')
    .map(s => s.trim())
    .filter(s => s.length)
    .map((line, row) => line.split('').map((char, col) => {
      const token = charToToken(char)
      const dir = 0;
      return {
        token, row, col, dir
      }
    }))
}



