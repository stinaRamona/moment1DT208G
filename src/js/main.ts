
window.onload = init; 
//Sidan hämtar information från LocalStorage vid start 
function init(){

}
//Interface med code, name, progression, syllabus 

interface courseInfo {
    code: string; 
    name: string; 
    progression: string; // kanske boolean på denna pga det bara finns tre alternativ?  
    syllabus: string; 
}

//spara och hämta infromation från local storage | setItem och getItem 
function saveCourse(){

}

//Funktion för att lägga till kurs | Både LocalStorage och Kurslistan
function addNewCourse() {
    //hämta element för formuläret
    let courseFormEl = document.getElementById("courseForm") as HTMLFormElement; 

    //hämta dom element för input
    let courseCodeEl = document.getElementById("courseCode") as HTMLInputElement;
    let courseNameEl = document.getElementById("courseName") as HTMLInputElement; 
    let courseProgressionEl = document.querySelector('input[name="courseProgression"]:checked') as HTMLInputElement; 
    let courseSyllabusEl = document.getElementById("courseSyllabus") as HTMLInputElement; 

    let newCourse: courseInfo = {
        code: courseCodeEl.value,
        name: courseNameEl.value, 
        progression: courseProgressionEl.value, //hur får man information ut en radioknapp? 
        syllabus: courseSyllabusEl.value,
    } 

    //localStorage.setItem(newCourse) //kan inte ta emot newCourse...

    printCourse(newCourse)
}

//skriver ut kurser till DOM
function printCourse(course: courseInfo){

}
//Uppdatera information om befintlig kurs | Både LocalStorage och Kurslistan 

