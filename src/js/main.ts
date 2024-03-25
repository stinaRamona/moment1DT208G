
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

//Funktion som uppdaterar om kurs ändras. Har den innan printCourse så att den kan kallas på i den funktionen. 
function updateCourse(element: HTMLElement, field:string): void{
    //hämtar från local storage och uppdaterar om det finns något i local storage genom html elementet 
    let courseInfoEl = element.closest("article");
    
    if (courseInfoEl) {
        let courseIndex = Array.from(courseListEl.children).indexOf(courseInfoEl);
        if (courseIndex !== -1) {
            let storedCourses = localStorage.getItem("courses");
            if (storedCourses) {
                let courses: courseInfo[] = JSON.parse(storedCourses);
                courses[courseIndex][field] = element.textContent!.trim(); // ! tystar om element.textContent inte är null
                localStorage.setItem("courses", JSON.stringify(courses));
            }
        }
    }
}

//skriver ut kurser till DOM
function printCourse(course: courseInfo): void{ 
    
    let courseInfoEl = document.createElement("article"); 

    let errorMessage = document.createElement("div"); 
    /*Värdena som skrivs ut är ändringsbara med contenteditable. Med oninput så kallas 
    på en function som heter update courses. Där sparas ändringar till local storage */

    courseInfoEl.innerHTML = `
    <p>Kurskod: <span contenteditable="true" oninput="updateCourse(this, 'code')">${course.code}</span></p>
    <p>Kursnamn: <span contenteditable="true" oninput="updateCourse(this, 'name')">${course.name}</span></p>
    <p>Progression: <span contenteditable="true" oninput="updateCourse(this, 'progression')">${course.progression}</span></p>
    <p>Kursplan: <a contenteditable="true" href=${course.syllabus} oninput="updateCourse(this, 'syllabus')">${course.syllabus}</a>
    <br>
    <br>`; 

    //Ska bara kunna ändra till A, B eller C 
    if(course.progression === "A" || course.progression === "B" || course.progression === "C") {
        errorMessage.innerHTML = " "; 
    } else {
        errorMessage.innerHTML = "Var vänlig skriv i en giltig progression (A, B eller C)";
    }

    courseListEl.appendChild(courseInfoEl); 
    courseListEl.appendChild(errorMessage); 

} 
