/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import Input from '../src/components/Input';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function tryWithoutName() {
    alert('Sem nome você não consegue ir para o quiz!');
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Aleatório Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(event) => {
              event.preventDefault();

              if (name.length === 0) {
                tryWithoutName();
              } else {
                router.push(`/quiz?name=${name}`);
              }
            }}
            >
              <Input
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Me diz teu nome"
              />
              <Button>
                JOGAR
                {' '}
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/viniciud" />
    </QuizBackground>
  );
}
