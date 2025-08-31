import { useContext } from "react";
import { QuestionContext } from "../../context/SelectedQuestionProvider";
import { useNavigate } from "react-router-dom";

const mainDSATopics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Hashing",
  "Recursion",
  "Backtracking",
  "Binary Search",
  "Greedy Algorithms",
  "Dynamic Programming",
  "Trees",
  "Graphs",
  "BFS (Breadth First Search)",
  "DFS (Depth First Search)",
  "Shortest Path Algorithms",
  "Heap / Priority Queue",
  "Trie",
  "Bit Manipulation",
  "Mathematics for DSA",
  "Geometry / Computational Geometry",
  "Disjoint Set / Union-Find",
  "Segment Tree",
  "Sliding Window",
  "Two Pointers",
];
function DsaTopics() {
  const navigate = useNavigate();
  const { question, setQuestion } = useContext(QuestionContext);

  const handelClick = (topic) => {
    setQuestion(topic);
    navigate("/generate", { replace: true });
  };

  return (
    <div className="p-6 min-h-screen mt-10">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
        Choose Your DSA Topic
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center text-lg mb-8">
        We’ll pick a random question from the topic you select
      </p>

      <div className="flex flex-wrap gap-6 justify-center">
        {mainDSATopics.map((topic, index) => (
          <div
            key={index}
            className="w-72 h-32 flex items-center justify-center text-center rounded-xl cursor-pointer
                   bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold text-lg
                   shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-lg
                   transform hover:scale-105 transition-all duration-300"
            onClick={() => handelClick(topic)}
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DsaTopics;
