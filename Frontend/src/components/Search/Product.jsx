import "./Product.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

function ProductCard({ info }) {
  let navigate = useNavigate();
  function handleClickOnProduct() {
    let url = "/product/" + info._id;
    navigate(url);
  }

  let newPrice = info.price - Math.round((info.price / 100) * info.discount);

  return (
    <section className="product-card card" onClick={handleClickOnProduct}>
      <div>
        <div className="image">
          <img alt={info.category} src={info.images[0].url} />
        </div>
        <div className="highlights">
          <div>
            <h5>{info.name}</h5>
            <div className="product-rating">
              <div className="star">
                <span>{info.rating}</span>
                <StarBorderIcon />
              </div>
              <span>{info.numOfRating} ratings</span>
            </div>
          </div>
          <ul>
            <li>Stylish & Portable Thin and Light Laptop</li>
            <li>15.6 inch</li>
            <li>Light Laptop without Optical Disk Drive</li>
            <li>Light Laptop without Optical Disk Drive</li>
          </ul>
        </div>
        <div className="price">
          <p>₹{newPrice}</p>
          <span>₹{info.price}</span>
          <span>{info.discount}% off</span>
        </div>
        <div />
      </div>
    </section>
  );
}

export default ProductCard;
