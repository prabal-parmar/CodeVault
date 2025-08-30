import axios from "axios";

export const generateHint = async (problem, setHint) => {
  try {
    if (problem !== "") {
      let res = await axios.post("http://localhost:8000/agent/generateHint", {
        question: problem,
      });
      setHint(res.data.response);
      // console.log(res.data.response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateCode = async (problem, language, setOutput) => {
  try {
    if (problem) {
      let res = await axios.post("http://localhost:8000/agent/generateCode", {
        question: problem,
        language: language,
      });
      setOutput(res.data.response);
      // console.log(res.data.response);
      return res.data.response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateRandom = async (question, setProblem, setHintButton) => {
  try {
    if (question) {
      let res = await axios.post("http://localhost:8000/agent/randomCode", {
        topic: question,
      });
      setProblem(res.data.response);
      setHintButton(false);
      // console.log(res.data.response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCodeToDB = async (question, hint, output) => {
  try {
    if (!question) {
      return null;
    }
    const res = await axios.post(
      "http://localhost:3000/get/addCode",
      {
        question: question,
        hint: hint,
        answer: output,
      },
      { withCredentials: true }
    );
    if(res.data) return res.data
  } catch (error) {
    console.log(error);
    throw error
  }
};
