import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

class Header extends Component {
  state = {
    showNavItems: false,
  }

  toggleNavItemsView = () => {
    this.setState(prevState => ({
      showNavItems: !prevState.showNavItems,
    }))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderNavItemsContiner = mobile => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <ul className={`nav-items-container${mobile}`}>
            <Link to="/" className="list-item">
              <li className="nav-item home-heading"> Home </li>
            </Link>
            <Link to="/cart" className="list-item">
              <li className="nav-item cart-heading">
                Cart
                {cartItemsCount > 0 && (
                  <span className="cart-count-badge">{cartList.length}</span>
                )}
              </li>
            </Link>
            <li className="nav-item">
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logout-button"
              >
                Logout
              </button>
            </li>
            <button type="button" aria-label="save" className="nav-button">
              <AiFillCloseCircle
                onClick={this.toggleNavItemsView}
                className="close-icon"
              />
            </button>
          </ul>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {showNavItems} = this.state
    return (
      <nav className="navbar">
        <div className="logo-hamburger-container">
          <Link className="website-logo-container" to="/">
            <img
              src="https://res.cloudinary.com/daehuqvdc/image/upload/v1706255502/lzobc0ww5uesw4wxregm.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-title"> Tasty Kitchens </h1>{' '}
          </Link>
          <button
            type="button"
            aria-label="save"
            onClick={this.toggleNavItemsView}
            className="nav-button"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        {this.renderNavItemsContiner('')}
        {showNavItems && this.renderNavItemsContiner('-mobile')}
      </nav>
    )
  }
}
export default withRouter(Header)
