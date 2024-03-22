
window.onload = init; 
//Sidan hämtar information från LocalStorage vid start 
function init(){
    //hämta information från local storage
    let storedCourse = localStorage.getItem("course"); 

    if(storedCourse != null){
    printCourse(JSON.parse(storedCourse)); 
    }
//Fungerar, men skriver bara ut det senaste av de tillagda kurserna.  

}

//Interface med code, name, progression, syllabus 

interface courseInfo {
    code: string; 
    name: string; 
    progression: string;   
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

    //Skapar array som newCourse läggs in i för att läggas in i local storage  
    let courseArr: any = []; 
    courseArr.push(newCourse); 

    courseArr.forEach(course => {
        localStorage.setItem("course", JSON.stringify(course)); //lägger till kursen till local storage
    });
    //localStorage.setItem("course", JSON.stringify(newCourse)); //lägger till kursen till local storage

    printCourse(newCourse); 

} 

//skriver ut kurser till DOM
function printCourse(course: courseInfo): void{ 
    
    let courseInfoEl = document.createElement("article"); 

    courseInfoEl.innerHTML = `
    <p>Kurskod: ${course.code}</p>
    <p>Kursnamn: ${course.name}</p>
    <p>Progression: ${course.progression}</p>
    <p>Kursplan: <a href=${course.syllabus}>Kursplan</a>
    `; 

    courseListEl.appendChild(courseInfoEl); 

}

//Uppdatera information om befintlig kurs | Både LocalStorage och Kurslistan 
 
