import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background-color: rgba(21, 21, 21, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #0e0e0e;
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
`

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`
