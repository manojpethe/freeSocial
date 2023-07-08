// import React from 'react'
import Menu from './menu/Menu'
import poster from "../assets/img/indianWedding.jpg"

const Intro = () => {
  return (
    <div><Menu />
      <div className='centerDiv' style={{"opacity":"75%"}}>
        <img src={poster} width={(screen.height / 100) * 50}></img>
      </div>
    </div>
  )
}

export default Intro