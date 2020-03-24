import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface ILoadingStyled {
  theme?: any;
}

export const ProcessingStyled = styled.div`
  color: #4e5164;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  svg {
    animation: ${rotate360} 0.8s steps(12, end) infinite;
    transform: translateZ(0);
    background: transparent;
    margin-top: -3px;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
`;
