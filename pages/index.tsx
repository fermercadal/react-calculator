import Head from "next/head";
import styles from "../styles/Home.module.css";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Calculator</title>
        <meta
          name="description"
          content="Javascript calculator project made with react"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="calculator" className="calculator">
        <Calculator />
      </main>
    </div>
  );
}
