// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {
    productDetails: [],
    similarProductDetails: [],
    apiStatus: apiStatusConstants.initial,
    count: 1,
  }
  componentDidMount() {
    this.getProductDetails()
  }
  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {id} = this.props.match.params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        id: data.id,
        imageUrl: data.image_url,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
      }
      const updateSimilarProd = updateData.similarProducts.map(data => ({
        id: data.id,
        imageUrl: data.image_url,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }))

      this.setState({
        productDetails: updateData,
        similarProductDetails: updateSimilarProd,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 2) {
      this.setState({count: count - 1})
    } else {
      this.setState({count: 1})
    }
  }
  onIncrement = () => {
    const {count} = this.state
    this.setState({count: count + 1})
  }
  renderProductDetailsView = () => {
    const {productDetails, similarProductDetails, count} = this.state
    console.log(productDetails)
    const {
      availability,
      brand,
      description,
      title,
      imageUrl,
      price,
      rating,
      style,
      totalReviews,
      id,
    } = productDetails
    return (
      <>
        <Header />
        <>
          <div className="product-details-container">
            <img src={imageUrl} alt="product" className="product-detail-img" />
            <div className="details-container">
              <h1 className="title">{title}</h1>
              <p className="price">Rs {price}/-</p>
              <div className="rating-box">
                <div className="rating-container">
                  <p className="rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
                <p className="reviews">{totalReviews} Reviews</p>
              </div>
              <p className="description">{description}</p>
              <p className="description">
                <span className="availability">Available: </span> {availability}
              </p>
              <p className="description">
                <span className="availability">Brand: </span> {brand}
              </p>
              <hr className="separator" />
              <div className="operation-btns">
                <button
                  data-testid="minus"
                  className="button"
                  onClick={this.onDecrement}
                >
                  <BsDashSquare className="btn1" />
                </button>
                <p className="count">{count}</p>
                <button
                  data-testid="plus"
                  className="button"
                  onClick={this.onIncrement}
                >
                  <BsPlusSquare className="btn2" />
                </button>
              </div>
              <button className="add-to-card-btn">ADD TO CART</button>
            </div>
          </div>
          <h1 className="products-list-heading1">Similar Products</h1>
          <div className="similar-product-container">
            {similarProductDetails.map(each => (
              <SimilarProductItem similarProductDetails={each} key={each.id} />
            ))}
          </div>
        </>
      </>
    )
  }

  renderProductDetailsFailureView = () => {
    return (
      <>
        <Header />
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h1 className="failure-heading">Product Not Found</h1>
          <Link to="/products">
            <button className="failure-btn">Continue Shopping</button>
          </Link>
        </div>
      </>
    )
  }
  renderLoadingView = () => {
    return (
      <>
        <Header />
        <div data-testid="loader" className="products-loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
        </div>
      </>
    )
  }
  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderProductDetailsFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
