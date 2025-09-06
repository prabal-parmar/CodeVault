import axios from "axios";

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