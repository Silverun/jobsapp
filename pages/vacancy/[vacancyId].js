import { useRouter } from "next/router";
import parse from "html-react-parser";

export default function SoloVacancy() {
  const router = useRouter();
  const vac = JSON.parse(router.query.vac);
  const description = parse(vac.vacancyRichText);

  return <div className="vac-description">{description}</div>;
}
