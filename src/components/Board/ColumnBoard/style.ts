import styled, { css } from 'styled-components'

export const ColumnWrapper = styled.li<{
  isDragging: boolean
  isLayer: boolean
}>`
  flex-shrink: 0;
  width: 240px;
  border-radius: 5px;
  background: linear-gradient(to bottom, #2e2e2e, #404040);
  border: 1px solid #404040;

  display: grid;
  grid-template-rows: 50px 1fr 40px;

  ${({ isDragging }) =>
    isDragging &&
    css`
      pointer-events: none;
      cursor: grabbing;
      border-style: dashed;
      border-width: 2px;
      background: transparent;

      & > * {
        opacity: 0;
      }
    `}

  ${({ isLayer }) =>
    isLayer &&
    css`
      box-shadow: 0 8px 8px -2px rgba(0, 0, 0, 0.2);
      transform: scale(1.05) rotate(-2deg);
    `}
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

export const ColumnBody = styled.ul<{ canDrop: boolean }>`
  padding: 20px 10px;
  overflow-y: auto;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  background: ${({ canDrop }) => (canDrop ? '#2e2e2e' : 'transparent')};
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
