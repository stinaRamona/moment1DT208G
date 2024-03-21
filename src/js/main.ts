/*
window.onload = init; 
//Sidan hämtar information från LocalStorage vid start 
function init(){

}
*/
//Interface med code, name, progression, syllabus 

interface courseInfo {
    code: string; 
    name: string; 
    progression: string; // kanske boolean på denna pga det bara finns tre alternativ?  
    syllabus: string; 
}

/*
//spara och hämta infromation från local storage | setItem och getItem 
function getCourseInfo(){

}
*/

//Element och eventlyssnare för att skicka formuläret och skriva ut 
let submitBtnEl = document.getElementById("submit") as HTMLButtonElement; 

let courseListEl = document.getElementById("courseList") as HTMLElement;

submitBtnEl.addEventListener("click", function(event){
    event.preventDefault(); //ser till att inte sidan laddas om
    addNewCourse(); 
}); 

//Funktion för att lägga till kurs | Både LocalStorage och Kurslistan
function addNewCourse() {
    //hämta dom element för input
    let courseCodeEl = document.getElementById("courseCode") as HTMLInputElement;
    let courseNameEl = document.getElementById("courseName") as HTMLInputElement; 
    let courseProgressionEl = document.querySelector('input[name="courseProgression"]:checked') as HTMLInputElement; 
    let courseSyllabusEl = document.getElementById("courseSyllabus") as HTMLInputElement; 

    let newCourse: courseInfo = {
        code: courseCodeEl.value,
        name: courseNameEl.value, 
        progression: courseProgressionEl.value,
        syllabus: courseSyllabusEl.value,
    } 

    //localStorage.setItem(newCourse) //kan inte ta emot newCourse...

    printCourse(newCourse); 

} 

//skriver ut kurser till DOM
function printCourse(course: courseInfo): void{ 
    
    let courseInfo = document.createElement("article"); 

    courseInfo.innerHTML = `
    <p>Kurskod: ${course.code}</p>
    <p>Kursnamn: ${course.name}</p>
    <p>Progression: ${course.progression}</p>
    <p>Kursplan: <a href=${course.syllabus}>Kursplan</a>
    `; 

    courseListEl.appendChild(courseInfo); 

}

//Uppdatera information om befintlig kurs | Både LocalStorage och Kurslistan 
 
