import React, { createContext, useEffect, useState } from 'react'


export const DarkModeContext = createContext()

function DarkModeProvider({children}) {
  const [darkMode, setDarkMode] = useState(() => (
    localStorage.getItem("mode") === "dark"
  ));


  useEffect(() => {
    if(darkMode){
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
    }
    else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  }, [darkMode])
  
  return (
    <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider