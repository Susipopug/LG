import { useState, type FC, type ReactNode } from "react";
import { createContext } from "react";
import type { ContextTypes } from "../interfaces/ContextTypes";
import type { IRegister } from "../interfaces/Inputs";

export const Context = createContext<ContextTypes | undefined>(undefined);

export const LoginRegisterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<IRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return <Context.Provider value={{ inputValue }}>{children}</Context.Provider>;
};
