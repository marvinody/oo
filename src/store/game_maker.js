export const EMPTY = 'EMPTY'
export const TERMINAL = 'TERMINAL'
export const PIPE = 'PIPE'
export const ANGLED = 'ANGLED'
export const THREE_WAY = 'THREE_WAY'
export const FOUR_WAY = 'FOUR_WAY'

export const NORTH = 'NORTH'
export const EAST = 'EAST'
export const SOUTH = 'SOUTH'
export const WEST = 'WEST'

export const CW = dir => {
  return (dir + 90)
}
export const CCW = dir => {
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



