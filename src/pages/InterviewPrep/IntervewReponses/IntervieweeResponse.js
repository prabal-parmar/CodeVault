import { toast } from "react-toastify";

let recognitionInstance = null;
let finalTranscript = "";
let externalResolve = null;

export function startListening(setGeneratedAnswers) {
  return new Promise((resolve, reject) => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.warning("Browser doesn't support audio input!");
      return reject("SpeechRecognition not supported");
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      finalTranscript = "";
      externalResolve = resolve;

      recognitionInstance.onstart = () => {
        console.log("Start speaking...");
      };

      recognitionInstance.onresult = (event) => {
        let response = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          response += event.results[i][0].transcript;
        }
        finalTranscript += " " + response;
        console.log("Captured:", response);
      };

      recognitionInstance.onerror = (err) => {
        reject(err.error);
      };

      recognitionInstance.onend = () => {
        console.log("Recording stopped");
        if (externalResolve) {
          externalResolve(finalTranscript.trim());
          externalResolve = null;
        }
      };

      recognitionInstance.start();
    } catch (error) {
      reject(error);
    }
  });
}

export function stopListening() {
  if (recognitionInstance) {
    recognitionInstance.stop();
    recognitionInstance = null;
  }
}
