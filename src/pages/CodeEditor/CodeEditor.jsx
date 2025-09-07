import Editor from "@monaco-editor/react";
import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../context/SelectedQuestionProvider";
import {
  generateHint,
  generateCode,
  generateRandom,
  addCodeToDB,
} from "../AgentResponse/agentResponse";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { useNavigate } from "react-router-dom";

const allLanguages = ["python", "cpp", "c", "java", "javascript"];

function CodeEditor() {
  const [hintButton, setHintButton] = useState(true);
  const [generateCodeButton, setGenerateCodeButton] = useState(true);
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("python");

  const [output, setOutput] = useState("You can write your code here");
  const [hint, setHint] = useState("");
  const [codeGenerated, setCodeGenerated] = useState(false);
  const { question, setQuestion } = useContext(QuestionContext);
  const [saved, setSaved] = useState(true);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate()
  useEffect(() => {
    function giveRandomQuestion() {
      if (question) {
        generateRandom(question, setProblem, setHintButton);
        generateHint(question, setHint);
      }
    }

    giveRandomQuestion();
  }, [question]);

  const handelSaveCode = async () => {
    try {
      const save = await addCodeToDB(problem, hint, output);

      if (save) {
        setSaved(false);
      } else {
        setSaved(true);
        alert("Error in saving code");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleHintForm = (e) => {
    e.preventDefault();
    if (problem) {
      setHintButton(false);
      generateHint(problem, setHint);
    } else {
      console.log("Prompt");
    }
  };

  const handelGenerate = async () => {
    if (!hintButton) {
      const output = await generateCode(problem, language, setOutput);
      setOutput(output);
      setCodeGenerated(true);
      setGenerateCodeButton(false);
    } else {
      setGenerateCodeButton(true);
      setCodeGenerated(false);
      return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 h-[80vh]">
        <div
          className="lg:w-1/2 flex flex-col items-start justify-start 
                    dark:bg-slate-800 bg-gray-300 p-6 rounded-xl shadow-xl h-full overflow-y-auto pb-20"
        >
          {hintButton ? (
            <form className="w-full" onSubmit={handleHintForm}>
              <label
                className="text-lg font-semibold mb-2 block dark:text-gray-100 text-gray-900"
                htmlFor="question"
              >
                Describe your Question
              </label>
              <textarea
                className="w-full h-40 p-3 border rounded-lg resize-none
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-blue-500
                       dark:border-gray-700 border-gray-400
                       dark:bg-gray-700 bg-white
                       dark:text-gray-200 text-gray-900
                       placeholder-gray-400"
                name="question"
                id="question"
                placeholder="Try to describe your problem in as much detail as possible..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
              <button
                className="w-full mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
                       text-white py-2 rounded-lg shadow-lg
                       hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                       transition-all duration-300 ease-in-out"
                type="submit"
              >
                Ask for Hint 💡
              </button>
            </form>
          ) : (
            <div className="w-full flex flex-col p-4">
              <div className="mb-8">
                <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-900 mb-2">
                  Problem
                </h2>
                <p className="text-4xl font-extrabold dark:text-white text-gray-800">
                  {problem.toUpperCase()}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-900 mb-2">
                  Hint
                </h2>
                <div
                  className="p-3 rounded-lg shadow-md border
                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                            bg-white border-gray-300 text-gray-900"
                >
                  <p className="text-lg">{hint}</p>
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
                       text-white py-2 rounded-lg shadow-lg mt-4
                       hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                       transition-all duration-300 ease-in-out"
                onClick={handelGenerate}
              >
                {generateCodeButton ? "✨ Generate Code" : "✨ Generate Again"}
              </button>
            </div>
          )}
        </div>

        <div
          className="lg:w-1/2 bg-gray-300 flex flex-col overflow-hidden h-full 
                    dark:bg-gray-950 bg-gray-100 rounded-xl shadow-xl"
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b bg-gray-300
                      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300
                      border-gray-300 text-gray-900"
          >
            <h2 className="text-lg font-semibold">Write or Edit your code</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded px-2 py-1
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
                     bg-white border-gray-300 text-gray-900"
            >
              {allLanguages.map((element, index) => (
                <option key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 pt-2">
            <Editor
              height="100%"
              language={language}
              theme={darkMode ? "vs-dark" : "vs-light"}
              value={output}
              defaultValue=""
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>
      </div>

      {codeGenerated && (
        <div className="flex justify-end p-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 mr-4"
            onClick={() => navigate(0)}
          >
            Try New Code
          </button>
          {saved ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
              onClick={handelSaveCode}
            >
              💾 Save Code
            </button>
          ) : (
            <button
              className="bg-gray-400 text-gray-200 font-semibold py-2 px-4 rounded-lg shadow-inner cursor-not-allowed transition-all duration-300"
              disabled
            >
              💾 Saved
            </button>
          )}
        </div>
      )}

      <div className="w-full h-1 bg-gray-300/60 shadow-sm my-8"></div>
    </div>
  );
}

export default CodeEditor;
