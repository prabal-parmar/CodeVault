import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { convertedCode, predictLanguage } from "../AgentResponse/agentResponse";

export default function CodeConvertor() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState(
    "// Converted code will appear here..."
  );
  const [language, setLanguage] = useState("cpp");
  const [predLang, setPredLang] = useState("Unknown");
  const [languagePredicted, setLanguagePredicted] = useState(false);
  const [codeConverted, setCodeConverted] = useState(false);
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

  const handleDetectLanguage = async () => {
    const language = await predictLanguage(inputCode);
    setPredLang(language.toLowerCase());
    setLanguagePredicted(true);
  };

  const handleConvertCode = async () => {
    const newcode = await convertedCode(inputCode, language);
    // console.log(newcode);
    setOutputCode(newcode);
    setCodeConverted(true);
  };

  const handleFindBugs = async () => {
    
  }

  return (
    <div className="flex flex-col gap-8 p-4 bg-gray-50 dark:bg-slate-900">
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
            Detected:{" "}
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
          onChange={(value) => {
            setInputCode(value);
            setLanguagePredicted(false);
          }}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            padding: { top: 16 },
          }}
        />

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50">
          <div className="flex items-center justify-center gap-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-101 hover:shadow-purple-500/30 disabled:from-gray-500 disabled:to-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100"
              onClick={handleDetectLanguage}
            >
                  {languagePredicted
                    ? `Detected: ${predLang}`
                    : "Detect Language"}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-101 hover:shadow-red-500/30 disabled:from-gray-500 disabled:to-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100"
              onClick={handleFindBugs}
              disabled={!languagePredicted}
            >
                Find Bugs
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center my-4 relative">
        <div className="absolute w-2/3 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full blur-3xl opacity-20 dark:opacity-30"></div>
        <div className="relative z-10 flex items-center gap-4 p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full border border-white/30 dark:border-slate-700/50 shadow-xl">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            onClick={handleConvertCode}
            disabled={codeConverted}
          >
            {codeConverted ? "Converted" : <>Convert To</>}
          </button>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCodeConverted(false);
            }}
            className="w-40 rounded-full px-4 py-2 text-sm border-none bg-white/50 dark:bg-slate-900/50 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          >
            {allLanguages.map((lang, index) => (
              <option
                key={index}
                value={lang}
                className="bg-white dark:bg-slate-800"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
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
          defaultValue={outputCode}
          onChange={(value) => setOutputCode(value)}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            padding: { top: 16 },
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
}
