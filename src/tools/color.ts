

export function hexToRgba(hex: string, alpha: number = 1): string {
    const sanitizedHex = hex.replace('#', '').length === 3
        ? hex.replace('#', '').split('').map((char) => char + char).join('')
        : hex.replace('#', '');

    const parsedHex = parseInt(sanitizedHex, 16);
    const red = (parsedHex >> 16) & 255;
    const green = (parsedHex >> 8) & 255;
    const blue = parsedHex & 255;

    return `rgba(${red},${green},${blue},${alpha})`;
}