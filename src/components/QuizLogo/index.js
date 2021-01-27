/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';

import React from 'react';

function Logo() {
  return (
    <div>
      <img
        src="https://www.imagemhost.com.br/images/2021/01/26/logo-quiz-sm.png"
        alt="logo-quiz-sm.png"
        border="0"
      />
    </div>
  );
}

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
