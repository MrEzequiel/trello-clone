import styled from 'styled-components'

export const ColumnWrapper = styled.li`
  flex-shrink: 0;
  width: 240px;
  border-radius: 5px;
  background: linear-gradient(to bottom, #2e2e2e, #404040);
  border: 1px solid #404040;

  display: grid;
  grid-template-rows: 50px 1fr 40px;
`

export const ColumnHeader = styled.header`
  background: #404040;
  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    color: #dedede;
  }
`

export const ColumnDragHandle = styled.div`
  width: 20px;
  height: 20px;
  cursor: grab;

  display: flex;
  align-items: center;
  justify-content: end;
  color: #b2b2b2;
`

export const ColumnBody = styled.ul`
  padding: 20px 10px;
  overflow-y: auto;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const ColumnFooter = styled.footer`
  background: #404040;
  padding: 0 10px;
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    background-color: transparent;
    color: #dedede;
  }
`
