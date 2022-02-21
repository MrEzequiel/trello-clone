import { FC, CSSProperties, memo } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'

import { CardDragIndicator, CardWrapper } from '../Card/style'
import { MdDragIndicator } from 'react-icons/md'
import ColumnBoard from '../ColumnBoard'
import useBoard from '../../../hook/useBoard'

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  offSetWidth: any
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset
  const transform = `translate(${x - offSetWidth + 25}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

const CardLayer: FC = () => {
  const { boardListData } = useBoard()
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }))

  function renderItem() {
    switch (itemType) {
      case 'CARD':
        return (
          <CardWrapper
            isDragging={false}
            isLayer={true}
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              cursor: 'grabbing !important'
            }}
          >
            <p>{item.name}</p>

            <CardDragIndicator>
              <MdDragIndicator />
            </CardDragIndicator>
          </CardWrapper>
        )

      case 'COLUMN':
        return (
          <ColumnBoard
            {...boardListData[item.indexColumn]}
            indexColumn={item.indexColumn}
            isLayer={true}
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              cursor: 'grabbing !important'
            }}
          />
        )

      default:
        return null
    }
  }

  if (!item || !isDragging || !item.width) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, item.width)}>
        {renderItem()}
      </div>
    </div>
  )
}

export default memo(CardLayer)
