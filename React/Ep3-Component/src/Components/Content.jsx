import React, { Component } from 'react'

export default class Content extends Component {
  render() {

    let user ={id:1,comp:'class'}
    let {id,comp}=user
    return (
      <div>Content</div>
    )
  }
}
