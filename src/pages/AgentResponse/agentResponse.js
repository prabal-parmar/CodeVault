import axios from "axios";
import { toast } from "react-toastify";


export const register = async (username, email, password, name) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/register",
      { username, email, password, name},
      { withCredentials: true }
    );
    toast.success("Registration Successfull. Please Login to continue")
    return res
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong!")
  }
}

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/login",
      { username, password },
      { withCredentials: true }
    );
    toast.success("Successfully Logged In")
    return res
  } catch (error) {
    console.log(error.message);
    toast.warn("Something went wrong!")
  }
}

export const logoutCoder = async (setCoder) => {
  try {
    await axios.post("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    toast.error("Problem in Signing Out!")
  } finally {
    localStorage.removeItem("token");
    setCoder(null);
    toast.success("Signed Out Successfully ")
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
    toast.error("Something went wrong while Generating Hint!")
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
    toast.error("Something went wrong while Generating Code!")
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
      toast.success("Question Generated Successfully")
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while Generating Question!")
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
    toast.success("Coded Added to Vault");
    if(res.data) return res.data
  } catch (error) {
    console.log(error);
    toast.error("Error in Adding code")
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
    toast.error("Error in fetching your codes!")
    return "?";
  }
}

export const updateAvatar = async (avatar) => {
  try {
    const res = await axios.post("http://localhost:3000/get/update-avatar",
      { avatar: avatar },
      { withCredentials: true }
    );
    toast.success("Avatar updated successfully")
    return res.data.coder.avatar
  } catch (error) {
    console.log(error.message)
    toast.error("Unable to update avatar!")
  }
  
}
