import { createContext, useState, useEffect } from "react";

export const AuthStore = createContext();

const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(() => {
    try {
      const users = localStorage.getItem("users");
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [questions, setQuestions] = useState(() => {
    try {
      const savedQues = localStorage.getItem("ques");
      const parsed = savedQues ? JSON.parse(savedQues) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Invalid questions data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(registeredUser)
    );
  }, [registeredUser]);

 
  useEffect(() => {
    if (user) {
      localStorage.setItem("currUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currUser");
    }
  }, [user]);

  
  useEffect(() => {
    localStorage.setItem("ques", JSON.stringify(questions));
  }, [questions]);

  
  const userEmail = user?.email?.toLowerCase();

  const userQuestions = userEmail
    ? questions.filter(
        (ques) =>
          ques.userEmail?.toLowerCase() === userEmail
      )
    : [];

  // Completed questions
  const totalCompletedques = userQuestions.filter(
    (ques) => ques.status === "Completed"
  );

  // DSA
  const dsaArr = userQuestions.filter(
    (ques) => ques.category === "DSA"
  );

  const CompletedQues = dsaArr.filter(
    (ques) => ques.status === "Completed"
  );

  // Git
  const gitQues = userQuestions.filter(
    (ques) => ques.category === "Git"
  );

  const completedGitQues = gitQues.filter(
    (ques) => ques.status === "Completed"
  );

  // Technical
  const TechQues = userQuestions.filter(
    (ques) => ques.category === "Technical"
  );

  const completedTechQues = TechQues.filter(
    (ques) => ques.status === "Completed"
  );

  // Category progress
  const dsaPercentage = dsaArr.length
    ? Math.round(
        (CompletedQues.length / dsaArr.length) * 100
      )
    : 0;

  const gitPercentage = gitQues.length
    ? Math.round(
        (completedGitQues.length / gitQues.length) * 100
      )
    : 0;

  const TechPercentage = TechQues.length
    ? Math.round(
        (completedTechQues.length / TechQues.length) * 100
      )
    : 0;

  // Overall progress
  const totalPercentage = userQuestions.length
    ? Math.round(
        (totalCompletedques.length / userQuestions.length) * 100
      )
    : 0;

  return (
    <AuthStore.Provider
      value={{
        registeredUser,
        setRegisteredUser,

        user,
        setUser,

        questions,
        setQuestions,
        userQuestions,

        totalCompletedques,
        dsaArr,
        CompletedQues,
        gitQues,
        completedGitQues,
        TechQues,
        completedTechQues,

        dsaPercentage,
        gitPercentage,
        TechPercentage,
        totalPercentage,
      }}
    >
      {children}
    </AuthStore.Provider>
  );
};

export default AuthProvider;
