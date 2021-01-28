/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Um quiz aleatório" />
        <meta
          property="og:image"
          content="https://www.imagemhost.com.br/images/2021/01/26/Background-2.png"
        />
        <meta property="og:type " content="game" />
        <meta
          property="og:description"
          content="Um desafio aleatório para Devs aleatórios"
        />
        <meta
          property="og:url"
          content="https://aleatorio-quiz.viniciud.vercel.app/"
        />
        <meta property="og:site_name " content="Aleatório Quiz" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
