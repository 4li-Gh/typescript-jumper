
export function fetchRecord(){
    return parseInt(localStorage.getItem('record')) || 0
}
export function storeRecord(record){
    localStorage.setItem("record", record + "");
}