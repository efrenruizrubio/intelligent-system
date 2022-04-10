const { createContext } = require("react");

const UserContext = createContext({ user: "", setUser: () => {} });

const UserProvider = ({ children }) => {
  const data = {};
  return <UserContext.Provider value={data}></UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
