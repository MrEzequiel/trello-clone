import styled, { css } from 'styled-components'

export const CardWrapper = styled.li<{
  isDragging: boolean
  isLayer?: boolean
}>`
  background: #393939;
  box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  color: #dedede;
  border: 1px dashed transparent;
  font-size: 1.4rem;
  min-height: 40px;

  display: flex;
  justify-content: space-between;

  ${({ isDragging }) =>
    isDragging &&
    css`
      box-shadow: none;
      cursor: grabbing;
      pointer-events: none;
      border-color: #717171;

      & > * {
        opacity: 0;
      }
    `}

  ${({ isLayer }) =>
    isLayer &&
    css`
      cursor: grabbing !important;
      pointer-events: none;
      transform: rotate(2deg);

      & > * {
        cursor: grabbing !important;
      }
    `}
`

export const CardDragIndicator = styled.button`
  background: transparent;
  cursor: grab;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: end;
  color: #9c9c9c;
`
