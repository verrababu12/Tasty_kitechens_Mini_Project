import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({
      errorMsg: errorMessage,
      showSubmitError: true,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          className="username-input-field"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          className="password-input-field"
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="small-device-logo-container">
            <img
              src="https://res.cloudinary.com/daehuqvdc/image/upload/v1709010760/s4lk5uvygwwjpic1la1a.png"
              alt="website login"
              className="small-device-logo"
            />
          </div>
          <form onSubmit={this.submitForm} className="form-container">
            <img
              src="https://res.cloudinary.com/daehuqvdc/image/upload/v1706255502/lzobc0ww5uesw4wxregm.png"
              alt="website logo"
              className="large-device-logo"
            />
            <h1 className="login-heading-ele"> Tasty Kitchens </h1>
            <h1 className="login-text-heading"> Login </h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message"> {errorMsg} </p>}
          </form>
        </div>
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/daehuqvdc/image/upload/v1705996228/juos7s5xxhcwwh2xywp8.jpg"
            className="welcome-image"
            alt="web"
          />
        </div>
      </div>
    )
  }
}
export default LoginPage
