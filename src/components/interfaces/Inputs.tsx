
export interface ILogin  {
  email: string;
  password: string;
};

export interface IRegister extends ILogin  {
  email: string;
  password: string;
  confirmPassword: string;
};
