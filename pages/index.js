import SearchBox from "@/components/SearchBox";
import SearchField from "@/components/SearchField";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import PaginatedVacs from "@/components/PaginatedVacs";
import axiosPrivate from "/config/axios";

export default function Home() {
  const [vacs, setVacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [industries, setIndustries] = useState([]);

  const searchVacHandler = async (vacSearch) => {
    setIsLoading(true);
    const result = await axiosPrivate.get(
      `/api/vacancies/?keyword=${vacSearch}`
    );
    setVacs(result.data);
    setIsLoading(false);
  };

  const getSidePanelData = (data) => {
    setVacs(data);
  };

  useEffect(() => {
    const getData = async () => {
      const vac = await axiosPrivate.get("/api/vacancies");
      console.log("Init load data", vac.data.objects);
      setVacs(vac.data.objects);

      const ind = await axiosPrivate.get("/api/catalogues");
      setIndustries(ind.data);
      setIsLoading(false);
    };
    getData();
    console.log("getdata ran");
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
          <PaginatedVacs itemsPerPage={4} initVacs={vacs} />
        </div>
      </div>
    );
  }
}
