import "@/styles/globals.css";
import "/styles/VacPill.css";
import "/styles/SearchBox.css";
import "/styles/Layout.css";
import "/styles/SoloVacancy.css";
import "/styles/Favorites.css";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}
