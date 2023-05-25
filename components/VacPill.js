import { useRouter } from "next/router";
import { useState } from "react";

const VacPill = ({
  id,
  profession,
  townTitle,
  typeOfWorkTitle,
  payFrom,
  payTo,
  currency,
  onClick,
}) => {
  const router = useRouter();
  const pathname = router.pathname;

  const checkIfFavorite = () => {
    if (
      "favoriteIds" in localStorage &&
      localStorage.getItem("favoriteIds") !== "[]"
    ) {
      const oldIdsStr = localStorage.getItem("favoriteIds");
      const oldIds = oldIdsStr.slice(1, oldIdsStr.length - 1).split(",");
      return oldIds.some((el) => el == id);
    } else {
      return false;
    }
  };

  const [isFavorite, setIsFavorite] = useState(() => checkIfFavorite());

  const toggleFavoriteHandler = () => {
    let newIds = [];
    const oldIds = JSON.parse(localStorage.getItem("favoriteIds"));

    if (isFavorite) {
      setIsFavorite(false);
      newIds = oldIds.filter((oldId) => oldId !== id);
      localStorage.setItem("favoriteIds", JSON.stringify(newIds));
    } else {
      if (oldIds) {
        newIds = [...oldIds, id];
      } else {
        newIds.push(id);
      }
      localStorage.setItem("favoriteIds", JSON.stringify(newIds));
      setIsFavorite(true);
    }
    if (pathname === "/favorites") window.location.reload(false);
  };

  const payment = () => {
    if (payFrom == "0" && payTo == "0") return `Без указания з/п`;
    if (payFrom == "0") return `до ${payTo} ${currency}`;
    if (payTo == "0") return `от ${payFrom} ${currency}`;
    if (payFrom == payTo) return `${payFrom} ${currency}`;
    return `от ${payFrom} - ${payTo} ${currency}`;
  };

  return (
    <li className="vacancy-card">
      <div role="button" onClick={onClick} className="vacancy-card__content">
        <div className="vacancy-card__heading">{profession}</div>
        <div className="vacancy-card__info">
          <p className="vacancy-card__info-pay">{payment()}</p>
          <p className="vacancy-card__info-dot">&bull;</p>
          <p className="vacancy-card__info-time">{typeOfWorkTitle}</p>
        </div>
        <div className="vacancy-card__location">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.714 12.8807C11.9335 13.6612 10.3013 15.2935 9.17814 16.4166C8.52727 17.0675 7.47304 17.0678 6.82217 16.4169C5.7186 15.3134 4.11797 13.7127 3.28593 12.8807C0.682439 10.2772 0.682439 6.05612 3.28593 3.45262C5.88943 0.849126 10.1105 0.849126 12.714 3.45262C15.3175 6.05612 15.3175 10.2772 12.714 12.8807Z"
              stroke="#ACADB9"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 8.16667C10.5 9.54738 9.38069 10.6667 7.99998 10.6667C6.61927 10.6667 5.49998 9.54738 5.49998 8.16667C5.49998 6.78595 6.61927 5.66667 7.99998 5.66667C9.38069 5.66667 10.5 6.78595 10.5 8.16667Z"
              stroke="#ACADB9"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="vacancy-card__location-city">{townTitle}</p>
        </div>
      </div>
      <button
        data-elem={`vacancy-${id}-shortlist-button`}
        className="vacancy-card__save"
        onClick={toggleFavoriteHandler}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavorite ? "#5E96FC" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z"
            stroke="#ACADB9"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </li>
  );
};
export default VacPill;
