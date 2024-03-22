
window.onload = init; 
//Sidan hämtar information från LocalStorage vid start 
function init(){
    //hämta information från local storage
    let storedCourses = localStorage.getItem("courses"); 

    //om det finns kurser så loopas de igenom och skickas till printCourse som skriver ut 
    if (storedCourses) {
        let courses = JSON.parse(storedCourses);
        courses.forEach(course => {
            printCourse(course);
        });
    }
}

//Interface med code, name, progression, syllabus 

interface courseInfo {
    code: string; 
    name: string; 
    progression: string;   
    syllabus: string; 
}

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
    
    //laddar sparade kurser från local storage
    let storedCourses = localStorage.getItem("courses");
    let courses: courseInfo[] = [];

    //om det finns kurser sparade laddas de in i arrayen 
    if (storedCourses) {
        courses = JSON.parse(storedCourses);
    }

    courses.push(newCourse);

    // Spara arrayen med alla kurser till local storage
    localStorage.setItem("courses", JSON.stringify(courses))

    printCourse(newCourse); 

} 

//skriver ut kurser till DOM
function printCourse(course: courseInfo): void{ 
    
    let courseInfoEl = document.createElement("article"); 

    courseInfoEl.innerHTML = `
    <p>Kurskod: <span contenteditable="true">${course.code}</span></p>
    <p>Kursnamn: <span contenteditable="true">${course.name}</span></p>
    <p>Progression: <span contenteditable="true">${course.progression}</span></p>
    <p>Kursplan: <a contenteditable="true" href=${course.syllabus}>${course.syllabus}</a>
    `; 

    courseListEl.appendChild(courseInfoEl); 

} 
 
