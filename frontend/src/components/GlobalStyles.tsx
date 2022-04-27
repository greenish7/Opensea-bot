import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --swiper-theme-color: #ccc;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Josefin Sans', sans-serif;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.background};
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20rem;
        background: ${({ theme }) => theme.tertiary};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.primary};
    }

    html{
        scroll-behavior: smooth;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    body{
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.secondary};
    }

    .container{
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .button{
        display: flex;
        align-items: center;
        width: fit-content;
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.tertiary};
        padding: 0.8rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        border: none;
    }
`;

export default GlobalStyles;
