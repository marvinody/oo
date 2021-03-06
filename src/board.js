import React from 'react';
import { connect } from "react-redux";
import { rotatePiece } from './store/game';

const Board = props => {
  return (
    <div className='game board'>
      {props.solved ? "SOLVED!" : ''}
      {props.board.map(row => {
        return (<div className='game row'>
          {row.map(piece => {
            const pieceName = piece.token.toLowerCase()
            return (
              <div className={`game piece ${pieceName}`}>
                <img
                  alt={pieceName}
                  src={`/${pieceName}.svg`}
                  onClick={() => props.rotatePieceRight(piece)}
                  onContextMenu={(e) => e.preventDefault() || props.rotatePieceLeft(piece)}
                  style={{ transform: `rotate(${piece.dir}deg)` }}
                />
              </div>
            )
          })}
        </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  board: state.game.board,
  solved: state.game.solved,
})

const mapDispatchToPros = dispatch => ({
  rotatePieceRight: piece => dispatch(rotatePiece(piece, true)),
  rotatePieceLeft: piece => dispatch(rotatePiece(piece, false))
})

export default connect(mapStateToProps, mapDispatchToPros)(Board)
