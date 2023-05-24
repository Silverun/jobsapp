const SearchBox = () => {
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
              class="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        <div className="search-box__bottom">
          <div className="search-box__bottom-ind">
            <label htmlFor="industry">Отрасль</label>
            <select name="industry" id="industry">
              <option value="" selected disabled hidden>
                Выберите отраcль
              </option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="search-box__bottom-wage">
            <label htmlFor="wage">Оклад</label>
            <input type="number" placeholder="От" />
            <input type="number" placeholder="До" />
          </div>
          <button>Применить</button>
        </div>
      </div>
    </div>
  );
};
export default SearchBox;
