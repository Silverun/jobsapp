import Image from "next/image";

export default function Favorites() {
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
        <button>Поиск вакансий</button>
      </div>
    </div>
  );
}
