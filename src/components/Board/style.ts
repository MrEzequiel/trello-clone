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

export const AddColumn = styled.li`
  flex-shrink: 0;
  width: 240px;
  height: min-content;
  border-radius: 5px;

  background: #1e1e1e;
  color: #ccc;
  &:hover {
    filter: brightness(1.08);
    color: #ededed;
  }

  & > button {
    cursor: pointer;
    background: transparent;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    gap: 5px;
  }
`

export const FormAddColumn = styled.form`
  width: 100%;
  display: flex;
  overflow: hidden;

  input {
    flex: 1;
    background: transparent;
    padding: 10px 5px;
    margin-left: 5px;
  }

  button {
    flex-shrink: 0;
    background: transparent;
    height: 36px;
    width: 36px;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #2e2e2e;
    box-shadow: -4px 0px 4px -1px rgb(0, 0, 0, 0.1);
  }
`
