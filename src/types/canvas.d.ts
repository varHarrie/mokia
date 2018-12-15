interface NodeCanvas extends HTMLCanvasElement {
  getContext (contextId: '2d', contextAttributes?: CanvasRenderingContext2DSettings): NodeCanvasCanvasRenderingContext2D
  getContext (contextId: 'webgl' | 'experimental-webgl', contextAttributes?: WebGLContextAttributes): null
  getContext (contextId: string, contextAttributes?: {}): NodeCanvasCanvasRenderingContext2D | null
}

interface NodeCanvasCanvasRenderingContext2D extends CanvasRenderingContext2D {
  antialias: 'default' | 'gray' | 'none' | 'subpixel'
}

declare module 'canvas' {
  export function createImageData (data: Uint8ClampedArray | Uint16Array, width: number, height?: number): ImageData
  export function createCanvas (width: number, height: number): NodeCanvas | HTMLCanvasElement
  export function registerFont (src: string, fontFace: {family: string, weight?: string, style?: string}): undefined
}
