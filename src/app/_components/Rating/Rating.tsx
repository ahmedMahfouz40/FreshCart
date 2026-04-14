import { BsStarHalf } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa6";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex gap-1 text-[#FCC800] text-lg">
          {[1, 2, 3, 4, 5].map((star) => {
            if (rating >= star) {
              return <FaStar key={star} />;
            } else if (rating >= star - 0.5) {
              return <BsStarHalf  key={star} />;
            } else {
              return <FaRegStar key={star} />;
            }
          })}
        </div>
        <div className="text-xs text-muted-foreground leading-4">{rating}</div>
      </div>
    </div>
  );
};

export default Rating;
