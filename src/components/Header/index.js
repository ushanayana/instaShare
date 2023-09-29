import {Link, withRouter} from 'react-router-dom'
import {Cookies} from 'js-cookie'

import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = ({history}) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="main-container">
      <div className="insta-logo-and-name">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dpuon8b3f/image/upload/v1695314600/logo_dok0n9.png"
            className="insta-logo"
            alt="logo"
          />
        </Link>
        <h1 className="insta-name">Insta Share</h1>
      </div>
      <div className="search-and-home-profile-container">
        <div className="search-container">
          <input type="search" className="search-bar" />
          <button type="button" className="search-icon-button">
            <FaSearch className="search-icon" />
          </button>
        </div>
        <ul className="nav-links-container">
          <Link to="/" className="nav-item">
            <li>Home</li>
          </Link>
          <Link to="/my-profile" className="nav-item">
            <li>Profile</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
