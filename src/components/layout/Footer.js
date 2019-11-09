import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return(
    <footer className="red lighten-2">
      <div className="container">
        <div className="row">
          <div className="col s4 footer-item">
            <Link to='/'>
              <i className="small material-icons">assessment</i>
              <div><span>集計</span></div>
            </Link>
          </div>
          <div className="col s4 footer-item">
            <Link to='/new'>
              <i className="small material-icons">edit</i>
              <div><span>記録</span></div>
            </Link>
          </div>
          <div className="col s4 footer-item">
            <Link to='/settings'>
              <i className="small material-icons">settings</i>
              <div><span>設定</span></div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
