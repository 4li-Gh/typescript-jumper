

export function random(min: any[]|number, max:number = null) {
    if(typeof min === "number")
        return Math.round(min + (Math.random() * (max - min)));
    else
        return min[Math.round(random(0, min.length - 1))]
}
