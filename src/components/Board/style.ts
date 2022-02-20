import styled from 'styled-components'

export const BoardSection = styled.main`
  width: 100vw;
  padding: 0 20px;
  margin-top: 20px;
`

export const BoardTitle = styled.h2`
  font-size: 2.2rem;
  font-size: 500;
  margin-bottom: 10px;
`

export const BoardWrapper = styled.ul`
  position: relative;
  width: 100%;
  height: 78vh;
  overflow: auto;

  display: flex;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  padding-bottom: 10px;
`
