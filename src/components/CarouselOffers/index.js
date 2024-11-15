import {Component} from 'react'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

class CarouselOffers extends Component {
  state = {
    offersList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getCarousel()
  }

  getCarousel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    this.setState({
      offersList: updatedData,
    })
  }

  renderCarousel = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 500,
    }

    const {offersList} = this.state
    return (
      <ul className="carousel-container">
        <Slider {...settings} className="carousel">
          {offersList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                className="offer-image"
                alt="offer"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#f7931e" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarousel()
  }
}
export default CarouselOffers
