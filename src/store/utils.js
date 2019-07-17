import { CW, EAST, NORTH, OPP, SOUTH, WEST } from './directions';
export const EMPTY = 'EMPTY'
export const TERMINAL = 'TERMINAL'
export const PIPE = 'PIPE'
export const ANGLED = 'ANGLED'
export const THREE_WAY = 'THREE_WAY'
export const FOUR_WAY = 'FOUR_WAY'

export const defaultDirsForPiece = pieceType => {
  switch (pieceType) {
    case EMPTY:
      return [];
    case TERMINAL:
      return [NORTH];
    case PIPE:
      return [NORTH, SOUTH];
    case ANGLED:
      return [NORTH, EAST]
    case THREE_WAY:
      return [NORTH, EAST, SOUTH]
    case FOUR_WAY:
      return [NORTH, EAST, SOUTH, WEST]
    default:
      throw new Error("Invalid piece type")
  }
}

export const charToToken = char => {
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

export const getNeighbors = (board, col, row) => {
  return [
    [-1, 0], [+1, 0],
    [0, -1], [0, +1],
  ].map(p => [col + p[0], [row + p[1]]])
    .filter(p => board[p[0]]) // check if col exists
    .filter(p => board[p[0]][p[1]]) // check if col,row exists
    .map(p => board[p[0]][p[1]])
    .filter(p => p.token !== EMPTY)
}
// returns direction of how to get to p2 from p1
export const getDirFromPoints = (p1, p2) => {
  const
    colDiff = p2.col - p1.col,
    rowDiff = p2.row - p1.row;

  if (rowDiff === 0 && colDiff === 1) {
    return EAST; // p2 is east of p1
  } else if (rowDiff === 0 && colDiff === -1) {
    return WEST;
  } else if (rowDiff === 1 && colDiff === 0) {
    return SOUTH;
  } else if (rowDiff === -1 && colDiff === 0) {
    return NORTH;
  } else {
    throw new Error(`INVALID NEIGHBORS: p1: ${p1}  p2: ${p2}`)
  }
}
// will chain a function n times, output back to input
// only 1 argument for the moment
export const repeatChainedFn = (fn, times) => {
  return function (arg) {
    let temp = arg;
    for (let i = 0; i < times; i++) {
      temp = fn.call(null, temp);
    }
    return temp;
  }
}

// returns an array of out dirs
export const getOutgoingDirections = piece => {
  // how many times should we turn the pieces?
  let numTurns = Math.floor((piece.dir % 360) / 90)
  // it might be negative, so let's orient it correctly
  numTurns = numTurns < 0 ? numTurns + 4 : numTurns
  // so let's make a fn to rotate pieces like that
  const rotate = repeatChainedFn(CW, numTurns);
  return defaultDirsForPiece(piece.token)
    .map(rotate);
}

// check if two pieces have a connection to each other
export const haveConnection = (piece1, piece2) => {
  const p2DirFromp1 = getDirFromPoints(piece1, piece2);
  const p1DirFromp2 = OPP(p2DirFromp1);
  const dirsFromp1 = getOutgoingDirections(piece1);
  const dirsFromp2 = getOutgoingDirections(piece2);
  return dirsFromp1.includes(p2DirFromp1) && dirsFromp2.includes(p1DirFromp2);
}
