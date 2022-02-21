import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDndBackend = () => MultiBackend as any

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDndOptions = () => HTML5toTouch
