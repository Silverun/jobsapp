import { useState } from "react";
import axios from "axios";

const SearchBox = ({ industries, getData }) => {
  const [wageFrom, setWageFrom] = useState("");
  const [wageTo, setWageTo] = useState("");
  const [selectedInd, setSelectedInd] = useState();

  const SideFilterHandler = async () => {
    console.log(selectedInd, wageFrom, wageTo);
    const result = await axios.get(
      `/api/vacancies/?catalogues=${selectedInd}&payment_from=${wageFrom}&payment_to=${wageTo}`
    );
    console.log(result.data);
    getData(result.data);
  };

  return (
    <div className="search-box">
      <div className="search-box-inner">
        <div className="search-box__top">
          <p className="search-box__top-name">Фильтры</p>
          <button className="search-box__top-button">
            Сбросить все
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        <div className="search-box__bottom">
          <div className="search-box__bottom-ind">
            <label htmlFor="industry">Отрасль</label>
            <select
              onChange={(e) => setSelectedInd(e.target.value)}
              value={selectedInd}
              defaultValue="Выберите отраcль"
              name="industry"
              id="industry"
              data-elem="industry-select"
            >
              <option value="Выберите отраcль" disabled hidden>
                Выберите отраcль
              </option>
              {industries.map((ind) => (
                <option key={ind.key} value={ind.key}>
                  {ind.title_trimmed}
                </option>
              ))}
            </select>
          </div>
          <div className="search-box__bottom-wage">
            <label htmlFor="wage">Оклад</label>
            <input
              onChange={(e) => setWageFrom(e.target.value)}
              value={wageFrom}
              type="number"
              placeholder="От"
              data-elem="salary-from-input"
            />
            <input
              onChange={(e) => setWageTo(e.target.value)}
              value={wageTo}
              type="number"
              placeholder="До"
              data-elem="salary-to-input"
            />
          </div>
          <button data-elem="search-button" onClick={SideFilterHandler}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchBox;
