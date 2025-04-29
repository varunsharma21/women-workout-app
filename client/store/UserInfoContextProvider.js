import React, { createContext, useState } from "react";

export const userInfoContext = createContext({});

function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    waist: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const userFormInfo = {
    userInfo,
    setUserInfo,
    isFormSubmitted,
    setIsFormSubmitted,
  };

  return (
    <userInfoContext.Provider value={userFormInfo}>
      {children}
    </userInfoContext.Provider>
  );
}

export default UserInfoContextProvider;
