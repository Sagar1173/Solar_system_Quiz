"use client";
import React, { useState, useEffect } from "react";
import questions from "@/components/Question";
import TypingMessage from "@/components/TypingMessage";
import NewTypingMessage from "@/components/NewTypingMessage"
const Home = () => {
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [options, setOptions] = useState([]);
  const [showStartButton, setShowStartButton] = useState(true);
  const [lives, setLives] = useState(3);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    if (questionIndex >= 0) {
      shuffleOptions();
    }
  }, [questionIndex]);

  useEffect(() => {
    if (lives === 0) {
      setShowRestart(true);
    }
  }, [lives]);

  const shuffleOptions = () => {
    const shuffled = [...questions[questionIndex].options].sort(
      () => Math.random() - 0.5
    );
    setOptions(shuffled);
  };

  const handleNextQuestion = () => {
    if (
      userAnswer.toLowerCase() === questions[questionIndex].answer.toLowerCase()
    ) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setUserAnswer("");
        setShowAnswer(false);
      } else {
        alert("Congratulations! You have completed the quiz.");
      }
    } else {
      if (lives === 1) {
        alert("You have lost all your lives. Starting from the beginning.");
        setQuestionIndex(0);
        setUserAnswer("");
        setShowAnswer(false);
        setLives(3);
        setShowRestart(false);
      } else {
        setLives(lives - 1);
        setShowAnswer(true);
      }
    }
  };

  const handleStart = () => {
    setQuestionIndex(0);
    setShowStartButton(false);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setUserAnswer("");
    setShowAnswer(false);
    setLives(3);
    setShowRestart(false);
  };

  let message =
    "INTRO: On August 20, 1977  voyager 2 was launched which contains a selection of sounds and images representing life and culture on Earth for an alien. Today we received respose from an alien named Bob it's your job to guide him in our solar system.";

  const renderHearts = () => {
    const hearts = [];
    const heartStyle = {
      color: "red", // Change color to red
    };
    for (let i = 0; i < lives; i++) {
      hearts.push(
        <span key={i} style={heartStyle}>
          &#x2764;
        </span>
      );
    }
    return hearts;
  };

  return (
    <>
      {showStartButton && (
        <div className="warp-container voyager-bg flex flex-col justify-center items-center relative">
            <img src="/Bob.png" alt="Spaceship" className=" absolute top-2 "/>
            <div class="warp-lines">
        </div>  
          <div className="text-center text-rose-100 text-4xl mt-12">
            <TypingMessage message={message} />
          </div>
          <button className="button-next" onClick={handleStart}>
            Start Mission
          </button>
        </div>
      )}

      {questionIndex >= 0 && (
        <div className="imageholder">

          <div className="flex flex-col relative justify-center items-center">
            
            <div className="spaceships flex justify-center items-center " style={{ backgroundImage: `url(${questions[questionIndex].img})`}}>
              <div className="absolute top-0 right-10 text-4xl mt-8">{renderHearts()}</div>
            </div>
            {/* <div className='font-medium text-sm mt-16 text-rose-100 mb-10 sm:text-2xl'>Question {questionIndex + 1}</div> */}
           
            <div className="text-rose-100 text-sm  sm:text-xl mb-12 w-2/3 text-center">
               < NewTypingMessage message={questions[questionIndex].conversation} />
            </div>

            <div className="font-medium text-rose-100 text-sm mb-4 sm:text-4xl text-center">
              {questionIndex + 1}. {questions[questionIndex].question}
            </div>
            
            <div className="text-rose-100 mb-4">
              <ul>
                {options.map((option, index) => (
                  <li className="p-1 text-sm sm:text-2xl" key={index}>
                    <label className="">
                      <input
                        type="radio"
                        className="mx-2 text-sm sm:text-2xl"
                        value={option}
                        checked={userAnswer === option}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={handleNextQuestion}
                className="bg-lime-600 px-4 py-2 rounded-lg mb-12 text-white text-xl font-semibold"
              >
                Next
              </button>
            </div>
            {showAnswer && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-rose-100 text-center text-sm sm:text-xl">
                  {" "}
                  The correct answer is: {questions[questionIndex].answer}
                </p>
                {showRestart && (
                  <button
                    className="bg-red-400 px-3 py-1 rounded-lg"
                    onClick={handleRestart}
                  >
                    Restart
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
