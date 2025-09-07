import { AdjustmentsIcon, BookOpenIcon, DocumentTextIcon, MicrophoneIcon, PlayIcon, RefreshIcon, Step, UserGroupIcon } from "./Icons";

const InterviewSteps = () => {
  return (
    <div className="space-y-6 text-left">
        <Step icon={<UserGroupIcon />}>Go to the <span className="font-semibold text-sky-600 dark:text-sky-400">Interview Workspace</span>.</Step>
        <Step icon={<MicrophoneIcon />}>Open the <span className="font-semibold text-sky-600 dark:text-sky-400">Mock Interview</span> section.</Step>
        <Step icon={<BookOpenIcon />}>Select your domain or area of expertise.</Step>
        <Step icon={<AdjustmentsIcon />}>Input your preferences if any.</Step>
        <Step icon={<PlayIcon />}>Start the interview and answer the questions.</Step>
        <Step icon={<DocumentTextIcon />}>Check your feedback in the <span className="text-green-600 dark:text-green-400 font-semibold">My Interview</span> section.</Step>
        <Step icon={<RefreshIcon />}>Keep practising regularly to improve your performance.</Step>
    </div>
  );
};

export default InterviewSteps;
