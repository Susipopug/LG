import type { IStudent } from "@/modules/pages/Students/interfaces/StudentInterface";
import { createContext, useContext, useState, type ReactNode } from "react";

const defaultAppContext = {
  students: [],
  addNewStudent: () => {},
};

const AppContext = createContext<IAppContext>(defaultAppContext);

interface IAppContext {
  students: IStudent[];
  addNewStudent: (value: IStudent) => void;
}
interface AppProviderProps {
  children: ReactNode;
}

const getNewStudentData = () => {
  const newStudentData = localStorage.getItem("newStudentData");
  if (newStudentData) {
    return JSON.parse(newStudentData);
  }
  return [];
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<IStudent[]>(getNewStudentData);

  const addNewStudent = (students: IStudent) => {
    setStudents((prev) => {
      const newStudentData = [...prev, students];
      localStorage.setItem("newStudentData", JSON.stringify(newStudentData));
      return newStudentData;
    });
  };
  const value = { students, addNewStudent };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
