import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  coder0,
  coder1,
  coder2,
  coder3,
  coder4,
  coder5,
  coder6,
} from "../../../assets/avatars";
import { fetchAvatar } from "../../AgentResponse/agentResponse";
import {
  fetchInterviewQuestion,
  aiSayQuestion,
  getFeedbackFromAI,
} from "../IntervewReponses/InterviewerResponse";
import { useParams } from "react-router-dom";
import {
  startListening,
  stopListening,
} from "../IntervewReponses/IntervieweeResponse";
import { toast } from "react-toastify";
const avatarOptions = {
  coder0: coder0,
  coder1: coder1,
  coder2: coder2,
  coder3: coder3,
  coder4: coder4,
  coder5: coder5,
  coder6: coder6,
};

const InterviewPage = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { role } = useParams();
  const [userPreference, setUserPreference] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [humanSpeaking, setHumanSpeaking] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const [answerNum, setAnswerNum] = useState(0);
  const [generatedAnswers, setGeneratedAnswers] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatar = await fetchAvatar();
        setSelectedAvatar(avatar);
      } catch (error) {
        // console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const speakQuestion = async (question) => {
    if (questionNum > 3) {
      return null;
    }
    const AIaudio = await aiSayQuestion(question);
    if (AIaudio) {
      AIaudio.onended = () => {
        setQuestionNum((prev) => prev + 1);
        setAiSpeaking(false);
      };
      setAiSpeaking(true);
      AIaudio.play();
    }
  };

  const saveInterviewResponse = async (finalAnswers) => {
    let feedback = await getFeedbackFromAI(generatedQuestions, finalAnswers);
    console.log(feedback)
    toast.success("Feedback saved successfully! Check your Interview Feedback section.");
  }

  const listenAnswer = async () => {
    try {
      setHumanSpeaking(true);
      const response = await startListening(setGeneratedAnswers);
      // console.log("generated Answer from listening", generatedAnswers)
      const updatedAnswers = [...generatedAnswers, response]
      setGeneratedAnswers(updatedAnswers);
      const tempAnswerNum = answerNum + 1;
      setAnswerNum(tempAnswerNum);

      if (answerNum === 3) {
        setAiSpeaking(false);
        setHumanSpeaking(false);
        setInterviewStarted(false);
        await saveInterviewResponse(updatedAnswers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitAnswer = () => {
    stopListening();
    setHumanSpeaking(false);
    speakQuestion(generatedQuestions[questionNum]);
  };

  const handelStartinterview = async () => {
    const response = await fetchInterviewQuestion(role, userPreference);
    setInterviewStarted(true);
    setGeneratedQuestions(response);
    let questions = response
      .split("/")
      .map((item) => item.replace(/\n/g, "").trim())
      .filter(Boolean);
    setGeneratedQuestions(questions);
    console.log(questions);
    setAiSpeaking(true);
    setQuestionNum(0);
    return speakQuestion(questions[0]);
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-extrabold text-center md:text-7xl lg:text-5xl tracking-tighter my-10">
        <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 ease-in-out hover:drop-shadow-xl">
          Interview by AI
        </span>
      </h1>

      <div className="w-full max-w-3xl mb-6 px-6 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Anything you would like to add for the AI-Interviewer..."
          className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 
             bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
             shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setUserPreference(e.target.value)}
        />
        <button
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
             text-white font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={handelStartinterview}
        >
          Start Interview
        </button>
      </div>

      <div className="flex w-full max-w-5xl px-6 mt-4 gap-4">
        <div
          className="flex flex-col items-center justify-center w-1/2 h-96 
                    bg-gradient-to-br from-slate-200 to-slate-400
                    dark:from-slate-700 dark:to-slate-900
                    rounded-2xl 
                    shadow-2xl dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                    m-4 p-6 transition-colors duration-500 relative border-2 border-dark-400 rounded-lg p-4"
        >
          {aiSpeaking && !humanSpeaking && (
            <div className="absolute top-4 text-lg font-bold text-indigo-700 dark:text-indigo-300 animate-pulse">
              Speaking...
            </div>
          )}

          {!aiSpeaking && humanSpeaking && (
            <div className="absolute top-4 text-lg font-bold text-red-700 dark:text-red-300 animate-pulse">
              Listening...
            </div>
          )}

          <div className="relative flex items-center justify-center p-2 rounded-full border-2 border-black bg-blue-900">
            {aiSpeaking && (
              <>
                <span className="absolute w-36 h-36 rounded-full bg-indigo-400/30 animate-ping"></span>
                <span className="absolute w-40 h-40 rounded-full bg-indigo-400/20 animate-ping animation-delay-700"></span>
                <span className="absolute w-48 h-48 rounded-full border-2 border-indigo-500 animate-pulse"></span>
              </>
            )}
            <Avatar
              alt="AI Interviewer"
              src="/ai-logo.png"
              sx={{
                width: 120,
                height: 120,
                transform: aiSpeaking ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
              className="relative z-10"
            />
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between w-1/2 h-96 
              bg-gradient-to-br from-indigo-200 to-indigo-400
              dark:from-indigo-600 dark:to-indigo-900
              rounded-2xl shadow-2xl dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
              m-4 p-6 transition-colors duration-500 relative border-2 border-dark-400"
        >
          {!humanSpeaking && aiSpeaking && (
            <div className="absolute top-4 text-lg font-bold text-red-700 dark:text-red-300 animate-pulse">
              Listening...
            </div>
          )}
          {humanSpeaking && !aiSpeaking && (
            <div className="absolute top-4 text-lg font-bold text-indigo-700 dark:text-indigo-300 animate-pulse">
              Speaking...
            </div>
          )}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex items-center justify-center p-2 rounded-full border-2 border-black bg-red-800">
              {humanSpeaking && (
                <>
                  <span className="absolute w-36 h-36 rounded-full bg-red-400/30 animate-ping"></span>
                  <span className="absolute w-40 h-40 rounded-full bg-red-400/20 animate-ping animation-delay-700"></span>
                  <span className="absolute w-48 h-48 rounded-full border-2 border-red-500 animate-pulse"></span>
                </>
              )}
              <Avatar
                alt="You"
                src={avatarOptions[selectedAvatar]}
                sx={{
                  width: 120,
                  height: 120,
                  transform: humanSpeaking ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="relative z-10"
              />
            </div>
          </div>
          <div className="mt-4">
            {interviewStarted && !aiSpeaking && !humanSpeaking && (
              <button
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => listenAnswer()}
              >
                Record Answer
              </button>
            )}
            {interviewStarted && !aiSpeaking && humanSpeaking && (
              <button
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => submitAnswer()}
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
