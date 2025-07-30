import React from "react";
import Slider from "react-slick";
import "../styles/CustomerReviews.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Piu Sarkar",
    img: "/assests/user.png",
    stars: 5,
    text: "Rick Dresses has amazing designs! The quality is top-notch.",
  },
  {
    name: "Arif Islam",
    img: "/assests/user.png",
    stars: 4,
    text: "The delivery was fast and the packaging was neat. 10/10!",
  },
  {
    name: "Sohini Dey",
    img: "/assests/user.png",
    stars: 5,
    text: "I wore a dress from Rick Dresses at a wedding — got so many compliments!",
  },
  {
    name: "Nusrat Jahan",
    img: "/assests/user.png",
    stars: 4,
    text: "Great fabric quality and reasonable price. I love it!",
  },
  {
    name: "Rahul Biswas",
    img: "/assests/user.png",
    stars: 5,
    text: "Excellent collection. My sister loved her birthday gift.",
  },
  {
    name: "Ananya Mukherjee",
    img: "/assests/user.png",
    stars: 5,
    text: "Beautiful designs and great customer service.",
  },
  {
    name: "Sayan Ghosh",
    img: "/assests/user.png",
    stars: 3,
    text: "Good experience overall, but I expected faster delivery.",
  },
  {
    name: "Tania Sinha",
    img: "/assests/user.png",
    stars: 5,
    text: "Loved the traditional styles. Will shop again!",
  },
  {
    name: "Abir Sen",
    img: "/assests/user.png",
    stars: 4,
    text: "Nice collection and packaging. Recommended!",
  },
  {
    name: "Shruti Roy",
    img: "/assests/user.png",
    stars: 5,
    text: "Very unique styles. My favorite online shop now!",
  },
  {
    name: "Debjit Das",
    img: "/assests/user.png",
    stars: 4,
    text: "Clothes are exactly as shown in pictures. Nice job!",
  },
  {
    name: "Payel Das",
    img: "/assests/user.png",
    stars: 5,
    text: "Very comfortable and stylish clothes!",
  },
  {
    name: "Vivek Mandal",
    img: "/assests/user.png",
    stars: 3,
    text: "Product was fine, but delivery took longer than expected.",
  },
  {
    name: "Mitali Dey",
    img: "/assests/user.png",
    stars: 5,
    text: "Perfect fit and design. Totally worth the price!",
  },
  {
    name: "Nayanika Bose",
    img: "/assests/user.png",
    stars: 5,
    text: "Elegant styles. I wore it on my engagement!",
  },
  {
    name: "Aritra Pal",
    img: "/assests/user.png",
    stars: 4,
    text: "Good collection. I will recommend to friends.",
  },
  {
    name: "Sristi Dutta",
    img: "/assests/user.png",
    stars: 5,
    text: "The dress color is exactly as shown. Love it!",
  },
  {
    name: "Mainak Paul",
    img: "/assests/user.png",
    stars: 4,
    text: "Nice interface and easy checkout process.",
  },
  {
    name: "Puja Roy",
    img: "/assests/user.png",
    stars: 5,
    text: "Their festive collection is mind-blowing!",
  },
  {
    name: "Sudipto Ghosh",
    img: "/assests/user.png",
    stars: 4,
    text: "Very responsive support team. Good experience.",
  },
  {
    name: "Niharika Chatterjee",
    img: "/assests/user.png",
    stars: 5,
    text: "Premium quality materials. Totally satisfied.",
  },
  {
    name: "Tushar Dey",
    img: "/assests/user.png",
    stars: 5,
    text: "Gifted a dress to my mom — she loved it!",
  },
  {
    name: "Swagata Pal",
    img: "/assests/user.png",
    stars: 4,
    text: "Everything went smooth. Happy shopping!",
  },
];

const CustomerReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="reviews-section" id="reviews">
      <h2 className="section-title">What Our Customers Say</h2>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div className="review-card fade-up" key={index}>
            <img src={review.img} alt={review.name} className="review-img" />
            <p className="review-text">“{review.text}”</p>
            <div className="review-stars">
              {Array.from({ length: review.stars }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <h4 className="review-name">— {review.name}</h4>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CustomerReviews;
