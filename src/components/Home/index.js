import {Component} from 'react'
import Header from '../Header'
import UserPosts from '../UserPosts'

import UsersStories from '../UsersStories'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <UsersStories />
        <UserPosts />
      </div>
    )
  }
}

export default Home
