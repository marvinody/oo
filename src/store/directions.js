export const NORTH = 'NORTH'
export const EAST = 'EAST'
export const SOUTH = 'SOUTH'
export const WEST = 'WEST'

export const CCW = dir => {
  switch (dir) {
    case NORTH:
      return WEST;
    case EAST:
      return NORTH;
    case WEST:
      return SOUTH;
    case SOUTH:
      return EAST;
    default:
      throw new Error("Invalid Direction");
  }
}

export const CW = dir => {
  switch (dir) {
    case NORTH:
      return EAST;
    case EAST:
      return SOUTH;
    case SOUTH:
      return WEST;
    case WEST:
      return NORTH;
    default:
      throw new Error("Invalid Direction");
  }
}

// essentially CW(CW(dir)) but table is prob quicker
export const OPP = dir => {
  switch (dir) {
    case NORTH:
      return SOUTH;
    case EAST:
      return WEST;
    case SOUTH:
      return NORTH;
    case WEST:
      return EAST;
    default:
      throw new Error("Invalid Direction");
  }
}
