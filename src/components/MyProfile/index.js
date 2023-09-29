import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class MyProfile extends Component {
  componentDidMount() {
    this.getProfileData()
  }

  getMyProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()

    console.log(data.profile)
  }

  render() {
    return (
      <div className="myprofile-container">
        <Header />
      </div>
    )
  }
}

export default MyProfile
