import "../styles/globals.css";
import type { AppProps } from "next/app";
import client from "./client";

export default function App({ Component, pageProps }: AppProps) {
  client;
  return <Component {...pageProps} />;
}
