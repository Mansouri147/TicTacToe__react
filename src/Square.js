import React from 'react'

function Square() {
    return (
        <div className='square'>
            <button className="square__button">
                {this.props.value}
            </button>
        </div>
    )
}

export default Square
