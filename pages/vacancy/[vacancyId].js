import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import VacPill from "@/components/VacPill";

export default function SoloVacancy() {
  const router = useRouter();
  const { vacancyId } = router.query;
  const [vac, setVac] = useState({});
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vacancyId) return;
    const getVacancy = async () => {
      const vac = await axios.get(`/api/vacancy/${vacancyId}`);
      setVac(vac.data);
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
    return (
      <div className="solo-vacancy">
        <div className="solo-vacancy__pill">
          <VacPill
            id={vac.id}
            profession={vac.profession}
            townTitle={vac.town.title}
            typeOfWorkTitle={vac.type_of_work.title}
            payFrom={vac.payment_from}
            payTo={vac.payment_to}
            currency={vac.currency}
            data-elem={`vacancy-${vac.id}`}
          />
        </div>
        <div className="solo-vacancy__description">{description}</div>
      </div>
    );
  }
}
