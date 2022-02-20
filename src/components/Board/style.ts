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

export const BoardContainer = styled.div`
  position: relative;
  height: 80vh;
  margin: 0 -20px;
`

export const BoardWrapper = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0 20px;

  bottom: 0;
  left: 0;
  overflow-x: auto;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateZ(0);

  display: flex;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  padding-bottom: 10px;

  &::-webkit-scrollbar-button {
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    border-left: none;
    border-right: none;
  }

  &::-webkit-scrollbar {
    border-left: 20px solid #1a1a1a;
    border-right: 20px solid #1a1a1a;
  }
`
