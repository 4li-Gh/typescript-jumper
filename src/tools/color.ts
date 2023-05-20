

export function hexToRgba(hex: string, alpha: number = 1): string {
    const sanitizedHex = hex.replace('#', '');
    let rgba = '';

    if (sanitizedHex.length === 3) {
        rgba = sanitizedHex
            .split('')
            .map((char) => `${char}${char}`)
            .join('');
    } else {
        rgba = sanitizedHex;
    }

    const parsedHex = parseInt(rgba, 16);
    const red = (parsedHex >> 16) & 255;
    const green = (parsedHex >> 8) & 255;
    const blue = parsedHex & 255;

    return `rgba(${red},${green},${blue},${alpha})`;
}