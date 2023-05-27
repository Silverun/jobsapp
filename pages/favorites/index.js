import PaginatedVacs from "@/components/PaginatedVacs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import axiosPrivate from "/config/axios";

export default function Favorites() {
  const router = useRouter();
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
  }, []);

  if (isLoading) {
    return (
      <div className="pulse-loader">
        <PulseLoader color="#5E96FC" />
      </div>
    );
  } else if (vacs.length === 0) {
    return (
      <div className="favorites-box">
        <div className="favorites-box__nothing">
          <Image
            alt="nothing_found"
            width={240}
            height={240}
            src="/no_results.png"
            className="favorites-box__img"
            priority={true}
          ></Image>
          <p>Упс, здесь еще ничего нет!</p>
          <button onClick={() => router.push("/")}>Поиск вакансий</button>
        </div>
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
