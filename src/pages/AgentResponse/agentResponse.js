import axios from "axios";


export const register = async (username, email, password, name) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/register",
      { username, email, password, name},
      { withCredentials: true }
    );
    return res
  } catch (error) {
    console.log(error.message);
    // prompt
  }
}

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/login",
      { username, password },
      { withCredentials: true }
    );
    return res
  } catch (error) {
    console.log(error.message);
    // prompt
  }
}

export const logoutCoder = async (setCoder) => {
  try {
    await axios.post("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("token");
    setCoder(null);
  }
}

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

export const fetchAvatar = async () => {
  try {
    const avatar = await axios.get("http://localhost:3000/get/avatar",
      { withCredentials: true }
    );
    // console.log("Avatar ",avatar.data.avatar)
    return avatar.data.avatar
  } catch (error) {
    console.log(error.message)
    return "coder0"
  }
}

export const fetchAllCodes = async () => {
  try {
    const codes = await axios.get("http://localhost:3000/get/allcodes", {
      withCredentials: true,
    });

    return codes.data.codes.length;
  } catch (error) {
    console.log(error.message)
    return "?";
  }
}

export const updateAvatar = async (avatar) => {
  try {
    const res = await axios.post("http://localhost:3000/get/update-avatar",
      { avatar: avatar },
      { withCredentials: true }
    );
    return res.data.coder.avatar
  } catch (error) {
    console.log(error.message)
    // prompt
  }
  
}
