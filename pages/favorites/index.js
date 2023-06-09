import PaginatedVacs from "@/components/PaginatedVacs";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import NoResults from "@/components/NoResults";

export default function Favorites() {
  const axiosPrivate = useAxiosPrivate();
  const [vacs, setVacs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ids = localStorage.getItem("favoriteIds");
    const getFavorites = async () => {
      const vac = await axiosPrivate.get(`/api/favorites/${ids}`);
      setVacs(vac.data.objects);
      setIsLoading(false);
    };
    getFavorites();
  }, [axiosPrivate]);

  if (isLoading) {
    return (
      <div className="pulse-loader">
        <PulseLoader color="#5E96FC" />
      </div>
    );
  } else if (vacs.length === 0) {
    return (
      <div className="favorites-box">
        <NoResults
          text="Упс, здесь еще ничего нет!"
          hasButton={true}
          isSmall={false}
        />
      </div>
    );
  } else {
    return (
      <div className="home-screen">
        <PaginatedVacs itemsPerPage={4} initVacs={vacs} />
      </div>
    );
  }
}
