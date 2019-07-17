import { charToToken, defaultDirsForPiece, getNeighbors, haveConnection } from './utils';

export const isGameSolved = board => {
  // for each piece in the board
  // check if everyone has a connection to another piece
  // every will stop iterating early if not everything fits
  return board.every((line, col) => line.every((piece, row) => {
    const neighbors = getNeighbors(board, col, row);
    const maxConnections = defaultDirsForPiece(piece.token).length
    const connectedNeighbors = neighbors.filter(n => haveConnection(piece, n));
    return maxConnections === connectedNeighbors.length
  }))
}



export default (str) => {
  return str.split('\n')
    .map(s => s.trim())
    .filter(s => s.length)
    .map((line, row) => line.split('').map((char, col) => {
      const token = charToToken(char)
      const dir = Math.floor(Math.random() * 4) * 90
      return {
        token, row, col, dir
      }
    }))
}



