import Image from "next/image";
import { useRouter } from "next/router";

const NoResults = ({ text, isSmall, hasButton }) => {
  const router = useRouter();
  return (
    <div
      className={
        isSmall ? "favorites-box__nothing_small" : "favorites-box__nothing"
      }
    >
      <Image
        alt="nothing_found"
        width={isSmall ? 100 : 240}
        height={isSmall ? 100 : 240}
        src="/no_results.png"
        className="favorites-box__img"
        priority={isSmall ? false : true}
      ></Image>
      <p>{text}</p>
      {hasButton ? (
        <button onClick={() => router.push("/")}>Поиск вакансий</button>
      ) : null}
    </div>
  );
};
export default NoResults;
