
const scoreElement = document.getElementById("score");
const recordElement = document.getElementById("record");

export function setRecord(record: number){
    recordElement.innerText = record + '';
}

export function setScore(score: number){
    scoreElement.innerText = score + '';
}
