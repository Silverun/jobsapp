import { useRouter } from "next/router";

export default function SoloVacancy() {
  const router = useRouter();
  const { vacancyId } = router.query;
  return <div>SoloVacancy {vacancyId}</div>;
}
