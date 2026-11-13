import React, { Component } from 'react'
import Shop from './Shop'

let user={id:1,compo:"Class"}

let {id,compo}=user


export default class Content extends Component {
  render() {
    return (
      <main> 
          <div className='box'>
            <form action="">
                <Shop/>
            </form>
          </div>

      </main>
    )
  }
}
