import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-input" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="username-input-field"
          value={username}
          id="username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-input" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="username-input-field"
          value={password}
          id="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dpuon8b3f/image/upload/v1695399334/Illustration_rq0ouy.png"
          className="login-image"
          alt="login"
        />

        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dpuon8b3f/image/upload/v1695314600/logo_dok0n9.png"
            className="insta-logo"
            alt="insta logo"
          />
          <h1 className="heading">Insta Share</h1>
          <div className="input-field">{this.renderUsernameField()}</div>
          <div className="input-field">{this.renderPasswordField()}</div>

          <button type="submit" className="submit-button">
            login
          </button>
          {showSubmitError && <p className="message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
