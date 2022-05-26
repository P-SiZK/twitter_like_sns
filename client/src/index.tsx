import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { HelmetProvider } from "react-helmet-async";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";
import { AuthorizedUrqlProvider } from "./components/Provider/authorizedUrqlProvider";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Segoe UI", Meiryo, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 15px;
    color: #FEFFFE;
    background-color: #152028;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirectUri={`${window.location.origin}/signup`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    >
      <AuthorizedUrqlProvider>
        <HelmetProvider>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </AuthorizedUrqlProvider>
    </Auth0Provider>
  </React.StrictMode>
);
