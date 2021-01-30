/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from "react";
import { Lottie } from '@crello/react-lottie';
import db from "../../db.json";
import Widget from "../../src/components/Widget";
import QuizLogo from "../../src/components/QuizLogo";
import QuizBackground from "../../src/components/QuizBackground";
import QuizContainer from "../../src/components/QuizContainer";
import AlternativesForm from "../../src/components/AlternativesForm";
import Button from "../../src/components/Button";

import loadingAnimation from '../../src/screens/Quiz/animations/loading.json';

import { useRouter } from 'next/router';


function ResultWidget({ results }) {
  const params = new URL(document.location).searchParams;
  const name = params.get("name");
  
  const router = useRouter();

  const qtdCorrect = results.reduce((somatoriaAtual, resultAtual) => {
    const isAcerto = resultAtual === true;
    if (isAcerto) {
      return somatoriaAtual + 1;
    }
    return somatoriaAtual;
  }, 0);

  return (
    <Widget>
      <Widget.Header>Resultado: </Widget.Header>

      <Widget.Content>
        <div>
          {qtdCorrect <= 2 && (
            <div>
              <h2> Você acertou {qtdCorrect} perguntas!</h2>
              <h3>
                Então nesse quiz você teve dificuldade, por favor não fique
                triste, foi por sua humildade.{" "}
              </h3>
            </div>
          )}
          {qtdCorrect > 2 && qtdCorrect <= 4 && (
            <div>
              <h2>Você acertou {qtdCorrect} perguntas!</h2>
              <h3>
                Acima da média você se manteve, mas do melhor desempenho, você
                se absteve.
              </h3>
            </div>
          )}
          {qtdCorrect > 4 && (
            <div>
              <h2>Você acertou {qtdCorrect} perguntas!</h2>
              <h3>
                Um bom desempenho é o que você conseguiu, meus parabéns player,
                você concluiu.
              </h3>
            </div>
          )}
          {/* {results.filter((x) => x).length} perguntas */}
        </div>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
          }}
        >
          {results.map((result, index) => (
            <h3
              style={{
                color: result ? db.theme.colors.success : db.theme.colors.wrong,
              }}
              key={`result__${result}`}
            >
              User:\{name ? name : 'unknown'}>{index + 1} Resultado:
              {result === true ? " Success" : " Error"}
            </h3>
          ))}
        </div>
      </Widget.Content>
      <div>
        <Button onClick={() => {
          router.push(`/`);
        }}>
          IR PARA INÍCIO</Button>
      </div>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(
    undefined
  );
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {/* {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>} */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([...results, result]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
