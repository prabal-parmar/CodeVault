import axios from "axios";
import { toast } from "react-toastify";

export const aiSayQuestion = async (question) => {
  try {
    if(question){
      let res = await axios.post("http://localhost:8000/agent/question-voice", 
        { question: question },
        { responseType: "blob" }
      );
    
      const url = URL.createObjectURL(res.data)
      const audio = new Audio(url)
      return audio;
    }
  } catch (error) {
    console.log(error.message)
    return null;
  }
}

export const fetchInterviewQuestion = async (role, user_preference) => {
  try {
    if (role) {
      let res = await axios.post("http://localhost:8000/agent/ai-interview", {
        role: role,
        user_preference: user_preference
      });
      return res.data.response
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while Generating Question!")
  }
}

export const getFeedbackFromAI = async (questions, answers) => {
  try {
    if(questions.length === 3 && answers.length === 3){
      let res = await axios.post("http://localhost:8000/agent/interview-feedback", {
        questions: questions,
        answers: answers
      });
      const resToDB = await axios.post(
      "http://localhost:3000/get/interview-feedback",
      {
        questions: questions,
        responses: answers,
        feedback: res.data.feedback,
        score: res.data.score,
        recommendations: res.data.recommendations
      },
      { withCredentials: true }
    );
      return res.data.feedback
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while generating Interview feedback!")
  }
}

export const fetchAllInterviews = async () => {
  try {
    const res = await axios.get("http://localhost:3000/get/interview-feedback",
      {withCredentials: true}
    )
    return res.data.interviews
  } catch (error) {
    console.log(error.message)
    toast.error("Something went wrong while fetching your interviews data!")
  }
}