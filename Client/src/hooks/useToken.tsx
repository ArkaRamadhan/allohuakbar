import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

type Credentials = {
  username: string;
  email: string;
  role: string;
};

type TokenContextType = {
  token: string | null;
  userDetails: Credentials;
};

const TokenContext = createContext({} as TokenContextType);

export const useToken = () => {
  return useContext(TokenContext);
};

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [userDetails, setUserDetails] = useState<Credentials | {}>({});

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserDetails(decoded);
    } else {
      setUserDetails({});
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, userDetails } as TokenContextType}>
      {children}
    </TokenContext.Provider>
  );
};
