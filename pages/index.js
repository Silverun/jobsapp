import SearchBox from "@/components/SearchBox";
import VacPill from "@/components/VacPill";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [vacs, setVacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const vac = await axios.get("/api/vacancies");
      console.log(vac.data.objects);
      setVacs(vac.data.objects);
      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="home-screen">
        <SearchBox />
        <div>
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
              <input type="text" placeholder="Введите название вакансии" />
            </div>
            <button>Поиск</button>
          </div>
          <ul className="vacancy-list">
            {vacs.map((vac) => (
              <VacPill
                key={vac.id}
                profession={vac.profession}
                firmName={vac.firm_name}
                townTitle={vac.town.title}
                typeOfWorkTitle={vac.type_of_work.title}
                payFrom={vac.payment_from}
                payTo={vac.payment_to}
                currency={vac.currency}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
