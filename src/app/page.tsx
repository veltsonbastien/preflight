import { Metadata } from "next";
import { Main } from "@/components";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Main />
    </main>
  );
}

export const metadata: Metadata = {
  title: "PreFlight | Pre - PR Code Checker",
};
