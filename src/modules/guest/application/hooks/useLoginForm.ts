import { useState } from "react";

export const useLoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return {
    id,
    password,
    error,
    setId,
    setPassword,
    setError,
  };
};
