import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Checkout = props => {
  const {username} = props

  return (
    <div>
      <h3></h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  
}

export default connect(mapState)(Checkout)