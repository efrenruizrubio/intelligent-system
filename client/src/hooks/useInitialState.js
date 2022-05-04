import { useState } from "react";

const useInitialState = () => {
  const [user, setUser] = useState({});

  return {
    user,
    setUser,
  };
};

export default useInitialState;
