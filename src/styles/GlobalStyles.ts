import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    scroll-behavior: smooth;
    font-size: 62.5%;
  }

  body {
    font: 400 1.6rem 'Inter', sans-serif;
    background: #1A1A1A;
    color: #EDEDED;
  }

  ::-webkit-scrollbar {
    width: 1rem;
    background-color: #0E0E0E;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px inset;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 5px solid #0E0E0E;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 6px inset;
    background: #2E2E2E;
  }


  img {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  textarea {
    outline: none;
    border: none;
    color: inherit;
    font-family: inherit;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ol,
  ul {
    list-style: none;
  }
  html,
  body,
  div,
  span,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  a,
  em,
  img,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  article,
  footer,
  header,
  nav,
  section,
  main {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  ul {
    font-size: 1em;
    font-weight: normal;
  }
`
