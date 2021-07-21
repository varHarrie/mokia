import { template, clamp } from 'lodash';
import { rgb } from './color';

const svgTemplate = template(
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="{{width}}px" height="{{height}}px">\
<rect x="0" y="0" width="100%" height="100%" fill="{{background}}"/>\
<text x="50%" y="50%" font-size="{{fontSize}}px" fill="{{foreground}}" dominant-baseline="middle" text-anchor="middle" >{{text}}</text>\
</svg>`,
  { interpolate: /{{([\s\S]+?)}}/g },
);

function binaryToAscii(binary: string): string {
  return global.btoa ? global.btoa(binary) : Buffer.from(binary).toString('base64');
}

function svgToDataURL(svg: string): string {
  const prefixBase64 = 'data:image/svg+xml;charset=UTF-8;base64,';
  return prefixBase64 + binaryToAscii(unescape(svg));
}

/**
 * Returns a data url string of image
 */
export function imageDataURL(size?: string): string;
export function imageDataURL(size: string, text: string): string;
export function imageDataURL(size: string, text: string, background: string): string;
export function imageDataURL(size: string, text: string, background: string, foreground: string): string;
export function imageDataURL(...args: string[]): string {
  const [size = '100x100', , background = rgb(), foreground = '#fff'] = args;
  const text = args[1] ?? size;

  const [width, height] = size.split(/[x*]/).map((v) => Number(v));
  const fontSize = clamp(Math.min(width, height), 6, Math.floor(width / text.length));
  const svg = svgTemplate({ width, height, fontSize, background, foreground, text });

  return svgToDataURL(svg);
}
