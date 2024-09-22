// Write your code here
const SimilarProductItem = props => {
  const {similarProductDetails} = props
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
  } = similarProductDetails

  return (
    <div className="product-item">
      <img src={imageUrl} alt={`similar product {title}`} className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem
