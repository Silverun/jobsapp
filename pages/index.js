import SearchBox from "@/components/SearchBox";
import SearchField from "@/components/SearchField";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import PaginatedVacs from "@/components/PaginatedVacs";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function Home() {
  const [vacs, setVacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [industries, setIndustries] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [keyword, setKeyword] = useState("");

  const searchVacHandler = async (vacSearch) => {
    setIsLoading(true);
    const result = await axiosPrivate.get(
      `/api/vacancies/?keyword=${vacSearch}&search=1`
    );
    setVacs(result.data);
    setIsLoading(false);
    setKeyword(vacSearch);
  };

  const getSidePanelData = (data) => {
    setVacs(data);
  };

  useEffect(() => {
    const getData = async () => {
      const vac = await axiosPrivate.get("/api/vacancies/?basic=1");
      setVacs(vac.data.objects);
      const ind = await axiosPrivate.get("/api/catalogues");
      setIndustries(ind.data);
      setIsLoading(false);
    };
    getData();
  }, [axiosPrivate]);

  if (isLoading) {
    return (
      <div className="pulse-loader">
        <PulseLoader color="#5E96FC" />
      </div>
    );
  } else {
    return (
      <div className="home-screen">
        <SearchBox
          keyword={keyword}
          getData={getSidePanelData}
          industries={industries}
        />
        <div className="home-screen__box">
          <SearchField searchVacHandler={searchVacHandler} />
          {keyword && (
            <p className="home-screen__keyword">
              Результаты по запросу: {keyword}
            </p>
          )}
          <PaginatedVacs itemsPerPage={4} initVacs={vacs} />
        </div>
      </div>
    );
  }
}
