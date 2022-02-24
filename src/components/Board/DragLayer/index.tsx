import {
  FC,
  CSSProperties,
  memo,
  useContext,
  useRef,
  useState,
  useEffect
} from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'

import { CardDragIndicator, CardWrapper } from '../Card/style'
import { MdDragIndicator } from 'react-icons/md'
import ColumnBoard from '../ColumnBoard'
import useBoard from '../../../hook/useBoard'
import ContextRef from '../../../context/ContainerRefContext'

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
  const { ref } = useContext(ContextRef)
  const [isEndOfTheList, setIsEndOfTheList] = useState({
    end: false,
    direction: 'left'
  })
  const intervalRef = useRef<NodeJS.Timer>()

  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset() as XYCoord,
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

  useEffect(() => {
    if (isEndOfTheList.end) {
      intervalRef.current = setInterval(() => {
        if (ref.current) {
          if (isEndOfTheList.direction === 'right') {
            ref.current.scrollLeft += 2
          } else {
            ref.current.scrollLeft -= 2
          }
        }
      }, 2)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isEndOfTheList, ref, intervalRef])

  useEffect(() => {
    if (itemType === 'COLUMN' && ref.current && currentOffset) {
      const { width } = ref.current.getBoundingClientRect()
      const { x } = currentOffset

      if (width - 100 < x) {
        setIsEndOfTheList({
          end: true,
          direction: 'right'
        })
        return
      }

      if (x < 200) {
        setIsEndOfTheList({
          end: true,
          direction: 'left'
        })
        return
      }

      setIsEndOfTheList({
        end: false,
        direction: 'left'
      })
    }

    return () =>
      setIsEndOfTheList({
        end: false,
        direction: 'left'
      })
  }, [currentOffset, itemType, ref])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  })

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
