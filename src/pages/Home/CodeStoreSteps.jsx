import { LightbulbIcon, PencilIcon, SaveIcon, SparklesIcon, Step, TerminalIcon } from "./Icons";


function CodeStoreSteps() {
  return (
    <div className="space-y-6 text-left">
      <Step icon={<TerminalIcon />}>Go to the <span className="font-semibold text-sky-600 dark:text-sky-400">Generate</span> section.</Step>
      <Step icon={<PencilIcon />}>Enter your question for which you want a hint.</Step>
      <Step icon={<LightbulbIcon />}>Check the hints and try solving the problem yourself.</Step>
      <Step icon={<SparklesIcon />}>Generate the full answer if needed.</Step>
      <Step icon={<SaveIcon />}>Click <span className="font-semibold text-green-600 dark:text-green-400">Save</span> to store your question and solution for future reference.</Step>
    </div>
  );
}

export default CodeStoreSteps;
