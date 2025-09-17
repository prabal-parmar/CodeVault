import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { predictLanguage } from "../AgentResponse/agentResponse";

export default function CodeConvertor() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [predLang, setPredLang] = useState("unknown")
  const { darkMode } = useContext(DarkModeContext);
  const allLanguages = [
    "javascript",
    "python",
    "cpp",
    "java",
    "csharp",
    "go",
    "php",
    "ruby",
    "typescript",
  ];

  const handelPredictLanguage = async () => {
    const language = await predictLanguage(inputCode)
    setPredLang(language.toLowerCase());
    
  }

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 dark:bg-slate-900">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
          Code Convertor
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-md">
          (Write code, predict its language, and convert it instantly)
        </p>
      </div>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 font-semibold text-lg">
          <span>Input Code</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Predicted:{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {predLang}
            </span>
          </span>
        </div>

        <Editor
          height="400px"
          language={predLang}
          theme={darkMode ? "vs-dark" : "vs-light"}
          value={inputCode}
          defaultValue="// Write your code here..."
          onChange={(value) => setInputCode(value)}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            padding: { top: 16 },
          }}
        />

        <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
                 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
                 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300"
            onClick={handelPredictLanguage}
          >
            Predict Language
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg px-4 py-2 text-base border border-gray-400 dark:border-gray-600
                     bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        >
          {allLanguages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-300">
          Convert
        </button>
      </div>

      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-100 font-semibold text-lg">
          Converted Code
        </div>
        <Editor
          height="400px"
          language={language}
          theme={darkMode ? "vs-dark" : "vs-light"}
          value={outputCode}
          defaultValue="// Converted code will appear here..."
          onChange={(value) => setOutputCode(value)}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
}
