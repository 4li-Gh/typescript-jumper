
const scoreElement = document.getElementById("score");
const recordElement = document.getElementById("record");

export function setRecord(record){
    recordElement.innerText = record;
}

export function setScore(score){
    scoreElement.innerText = score;
}
