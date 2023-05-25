import SearchBox from "@/components/SearchBox";
import SearchField from "@/components/SearchField";
import VacPill from "@/components/VacPill";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Home() {
  const [vacs, setVacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [industries, setIndustries] = useState([]);
  const router = useRouter();

  const searchVacHandler = async (vacSearch) => {
    const result = await axios.get(`/api/vacancies/?keyword=${vacSearch}`);
    setVacs(result.data);
  };

  const getSidePanelData = (data) => {
    setVacs(data);
  };

  const vacClickHandler = (vac) => {
    router.push({
      pathname: `vacancy/${vac.id}`,
      query: { vac: JSON.stringify(vac) },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const vac = await axios.get("/api/vacancies");
      console.log(vac.data.objects);
      setVacs(vac.data.objects);

      const ind = await axios.get("/api/catalogues");
      setIndustries(ind.data);
      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="pulse-loader">
        <PulseLoader color="#5E96FC" />
      </div>
    );
  } else {
    return (
      <div className="home-screen">
        <SearchBox getData={getSidePanelData} industries={industries} />
        <div>
          <SearchField searchVacHandler={searchVacHandler} />
          <ul className="vacancy-list">
            {vacs.map((vac) => (
              <VacPill
                onClick={() => vacClickHandler(vac)}
                key={vac.id}
                id={vac.id}
                profession={vac.profession}
                firmName={vac.firm_name}
                townTitle={vac.town.title}
                typeOfWorkTitle={vac.type_of_work.title}
                payFrom={vac.payment_from}
                payTo={vac.payment_to}
                currency={vac.currency}
                data-elem={`vacancy-${vac.id}`}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
