import Image from "next/image";
import { useRouter } from "next/router";

export default function Favorites() {
  const router = useRouter();
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
}
