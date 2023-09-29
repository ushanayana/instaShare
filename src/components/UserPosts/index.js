import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import UserPostItem from '../UserPostItem'

class UserPosts extends Component {
  state = {
    postsData: [],
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        comments: eachPost.comments,
        userId: eachPost.user_id,
        profilePic: eachPost.profile_pic,
        userName: eachPost.user_name,
        postCaption: eachPost.post_details.caption,
        postImage: eachPost.post_details.image_url,
      }))
      this.setState({
        postsData: updatedData,
      })
    }
  }

  renderSuccessView = () => {
    const {postsData} = this.state
    console.log(postsData)
    return (
      <ul className="posts_list_container">
        {postsData.map(eachPost => (
          <UserPostItem eachPost={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  render() {
    return <div className="result-container">{this.renderSuccessView()}</div>
  }
}

export default UserPosts
