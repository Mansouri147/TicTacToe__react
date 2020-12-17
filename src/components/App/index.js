import React from "react";
import Game from "../Game";
import "./styles.css";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#42f33c",
        main: "#06b900",
        dark: "#095000",
        contrastText: "#fff",
      },
      default: {
        main: "#000",
      },
    },
  });

  const DefaultButton = withStyles({
    root: {
      "&:hover": {
        backgroundColor: "#0069d933",
      },
    },
  })(Button);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>
    </div>
  );
}

export default App;
