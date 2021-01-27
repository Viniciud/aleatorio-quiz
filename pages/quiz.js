/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable linebreak-style */
import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';

export default function QuizPage() {
  const router = useRouter();
  const params = (new URL(document.location)).searchParams;
  const name = params.get('name');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <h1 style={{ marginLeft: '50px' }}>
        Por enquanto está assim
        {' '}
        <div style={{ color: 'yellow' }}>
          {name}
          !
        </div>
      </h1>
      <a
        onClick={() => {
          router.push('/');
        }}
        style={{ marginLeft: '50px', cursor: 'pointer' }}
      >
        Voltar

      </a>
    </QuizBackground>

  );
}
