import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "24px",
          padding: "8px",
          // Дополнительные стили если нужно
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
          minWidth: "440px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "20px 24px",
          // Убираем верхний паддинг если он конфликтует с заголовком
          "&:first-of-type": {
            paddingTop: "20px",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          gap: "8px",
          display: "flex",
          flexDirection: "column",
          "& > *": {
            width: "100%",
            boxSizing: "border-box",
            margin: "0 !important", // ← Добавьте эту строку
            height: "40px",

            //
          },
        },
      },
    },
    // Дополнительно можно стилизовать другие компоненты
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "8px",
        },
        root: {},
        // MuiOutlinedInput:{

        // }
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            // minHeight: "82px",  if I change this my auth inputs change the height as well
          },
          "& .MuiInputBase-input": {},
          "& .MuiInputBase-inputMultiline": {},
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.inputLabel": {
            marginBottom: "8px",
            fontWeight: 500,
          },
        },
      },
    },
  },
  // Также можно настроить цветовую палитру и т.д.
  palette: {
    primary: {
      main: "#1677FF",
    },
  },

  // Стили для Switch (ваш AntSwitch)
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: "flex",
        "&:active": {
          "& .MuiSwitch-thumb": {
            width: 15,
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
          },
        },
      },
      switchBase: {
        padding: 2,
        "&.Mui-checked": {
          transform: "translateX(12px)",
          color: "#fff",
          "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#1890ff",
          },
        },
      },
      thumb: {
        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: "width 200ms",
      },
      track: {
        borderRadius: "16px / 2",
        opacity: 1,
        backgroundColor: "rgba(0,0,0,.25)",
        boxSizing: "border-box",
      },
    },
  },
});
