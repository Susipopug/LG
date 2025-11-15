import { Button } from "antd";

interface MyButtonProps {
  children: React.ReactNode;
  // color: string;
  // backgroundColor: string;
  // border: string;
  onClick?: () => void;
  buttonType?: "link" | "text" | "default" | "primary" | "dashed";
  htmlType?: "submit" | "button" | "reset";
}

export const MyButton = ({
  onClick,
  children,
  buttonType = "primary",
  htmlType = "button",
}: MyButtonProps) => {
  return (
    <Button
      type={buttonType}
      htmlType={htmlType}
      onClick={onClick}
      block
    >
      {children}
    </Button>
  );
};
