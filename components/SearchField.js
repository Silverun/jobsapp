import { useState } from "react";

const SearchField = ({ searchVacHandler }) => {
  const [vacSearch, setVacSearch] = useState("");

  return (
    <div className="home-screen__search">
      <div className="home-screen__search-input">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.468 10.468L13.5714 13.5714M12.0924 6.54622C12.0924 9.60931 9.60931 12.0924 6.54622 12.0924C3.48313 12.0924 1 9.60931 1 6.54622C1 3.48313 3.48313 1 6.54622 1C9.60931 1 12.0924 3.48313 12.0924 6.54622Z"
            stroke="#ACADB9"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          onChange={(e) => setVacSearch(e.target.value)}
          value={vacSearch}
          type="text"
          placeholder="Введите название вакансии"
          data-elem="search-input"
        />
      </div>

      <button
        data-elem="search-button"
        onClick={() => {
          searchVacHandler(vacSearch);
          setVacSearch("");
        }}
      >
        Поиск
      </button>
    </div>
  );
};
export default SearchField;
