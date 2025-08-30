import React, { useEffect, useState } from "react";
import { useCodeStore } from "../../hooks/store";
import axios from "axios";

function AllCodes() {
  const codes = useCodeStore((i) => i.codes);
  const setCodes = useCodeStore((i) => i.setCodes);

  useEffect(() => {
    const fetchAllCodes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/get/allcodes", {
          withCredentials: true,
        });
        setCodes(res.data.codes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCodes();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {codes.map((value, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "100%",
            backgroundColor: "#fff",
            position: "relative",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "22px",
              color: "#1a73e8",
              marginBottom: "15px",
            }}
          >
            {value.question}
          </p>

          {value.hint && (
            <p
              style={{
                fontStyle: "italic",
                color: "#555",
                marginBottom: "15px",
              }}
            >
              Hint: {value.hint}
            </p>
          )}

          <pre
            style={{
              backgroundColor: "#f5f5f5ac",
              padding: "15px",
              borderRadius: "5px",
              overflowX: "auto",
              marginBottom: "10px",
            }}
          >
            {value.answer}
          </pre>

          {value.createdAt && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "15px",
                fontSize: "12px",
                color: "#999",
              }}
            >
              Created on: {new Date(value.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllCodes;
