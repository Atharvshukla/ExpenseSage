import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;

    @media (max-width: 480px) {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;
