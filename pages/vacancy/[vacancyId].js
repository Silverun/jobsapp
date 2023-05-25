import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

export default function SoloVacancy() {
  const router = useRouter();
  const { vacancyId } = router.query;
  const [vacancy, setVacancy] = useState({});
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vacancyId) return;
    const getVacancy = async () => {
      const vac = await axios.get(`/api/vacancy/${vacancyId}`);
      console.log(vac.data);
      setVacancy(vac.data);
      setDescription(parse(vac.data.vacancyRichText));
      setIsLoading(false);
    };
    getVacancy();
  }, [vacancyId]);

  if (isLoading) {
    return (
      <div className="pulse-loader">
        <PulseLoader color="#5E96FC" />
      </div>
    );
  } else {
    return <div className="vac-description">{description}</div>;
  }
}
