import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import './index.css'

class UsersStories extends Component {
  state = {
    storiesList: [],
  }

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.users_stories.map(eachStory => ({
        userName: eachStory.user_name,
        userId: eachStory.user_id,
        storyUrl: eachStory.story_url,
      }))
      this.setState({storiesList: updatedData})
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story_container">
              <img
                className="storyImg"
                alt="user story"
                src={eachStory.storyUrl}
              />
              <p className="userName">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    return (
      <div className="user_stories_container">{this.renderSuccessView()}</div>
    )
  }
}
export default UsersStories
