import Editor from "@monaco-editor/react";
import { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../context/SelectedQuestionProvider";
import {
  generateHint,
  generateCode,
  generateRandom,
  addCodeToDB,
} from "../AgentResponse/agentResponse";

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
  const [saved, setSaved] = useState(true)
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

      if(save){
        setSaved(true)
      }
      else{
        setSaved(false)
        alert("Error in saving code")
      }
    } catch (error) {
      console.log(error)
    }
  }
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
        <div className="lg:w-1/2 flex flex-col items-start justify-start bg-gray-800 p-6 rounded-xl shadow-xl h-full overflow-y-auto pb-20">
          {hintButton ? (
            <form className="w-full" onSubmit={handleHintForm}>
              <label className="text-lg font-semibold mb-2 block text-gray-200">
                Ask Your Question
              </label>
              <textarea
                className="w-full h-40 p-3 border border-gray-600 rounded-lg resize-none
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-blue-500
                placeholder-gray-400 bg-gray-700 text-white"
                name="question"
                id="question"
                placeholder="Type your question here..."
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
                <h2 className="text-xl font-semibold text-gray-200 mb-2">
                  Problem
                </h2>
                <p className="text-4xl font-extrabold text-white">
                  {problem.toUpperCase()}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-200 mb-2">
                  Hint
                </h2>
                <div className="bg-gray-800 text-gray-100 p-2 rounded-lg shadow-md">
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
        <div className="lg:w-1/2 flex flex-col bg-gray-700 rounded-xl shadow-xl overflow-hidden h-full">
          <div className="flex items-center justify-between bg-gray-600 px-4 py-2 border-b border-gray-500">
            <h2 className="text-lg font-semibold text-white">
              Write or Edit your code
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 text-white border border-gray-500 rounded px-2 py-1"
            >
              {allLanguages.map((element, index) => (
                <option
                  key={index}
                  value={element}
                  onChange={() => setLanguage(language)}
                >
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 pt-2">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={output}
              defaultValue=""
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>
      </div>
      {codeGenerated
      ?
      <div className="flex justify-end p-4">
        {saved
        ?
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
          onClick={handelSaveCode}
        >
          💾 Save Code
        </button>
        :
        <button 
          className="bg-green-500 hover:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
          disabled
        >
          Saved
        </button>
        }
      </div>
      :
      null
      }
      <div className="w-full h-1 bg-gray-300/60 shadow-sm my-8"></div>
    </div>
  );
}

export default CodeEditor;
