import React, { useEffect, useState } from "react";
import { useCodeStore } from "../../hooks/store";
import axios from "axios"


function AllCodes() {
  const codes = useCodeStore((i) => i.codes);
  const setCodes = useCodeStore((i) => i.setCodes);
  
  useEffect(() => {
    const fetchAllCodes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/get/allcodes", {withCredentials: true})
            setCodes(res.data.codes)
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchAllCodes();
  }, [])
  

  return (
    <div>
      {codes.map((value, index) => (
        <div key={index} style={{border: "1px solid gray", padding: "10px", marginBottom: "10px"}}>
            <p><strong>Question:</strong> {value.question}</p>
            <p><strong>Hint:</strong> {value.hint}</p>
            <p><strong>Answer:</strong> {value.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default AllCodes;