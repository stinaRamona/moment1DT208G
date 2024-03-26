
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

    let errorMessage = document.createElement("div"); 
    /*Värdena som skrivs ut är ändringsbara med contenteditable. Med oninput så kallas 
    på en function som heter update courses. Där sparas ändringar till local storage */

    let codeSpan = document.createElement("span"); 
    codeSpan.contentEditable = "true";
    codeSpan.textContent = course.code;
    codeSpan.addEventListener("input", function() {
        updateCourse(this, 'code');
    });
    codeSpan.appendChild(document.createElement("br"))

    let nameSpan = document.createElement("span"); 
    nameSpan.contentEditable = "true"; 
    nameSpan.textContent= course.name;
    nameSpan.addEventListener("input", function() {
        updateCourse(this, 'name'); 
    })
    nameSpan.appendChild(document.createElement("br")); 

    let progressSpan = document.createElement("span"); 
    progressSpan.contentEditable = "true"; 
    progressSpan.textContent = course.progression; 
    progressSpan.addEventListener("input", function() {
        updateCourse(this, 'progression'); 
    })
    progressSpan.appendChild(document.createElement("br")); 

    let syllabusSpan = document.createElement("span"); 
    syllabusSpan.contentEditable = "true"; 
    syllabusSpan.textContent = course.syllabus; 
    syllabusSpan.addEventListener("input", function() {
        updateCourse(this, 'syllabus'); 
    })
    syllabusSpan.appendChild(document.createElement("br")); 

    //Ska bara kunna ändra till A, B eller C 
    if(course.progression === "A" || course.progression === "B" || course.progression === "C") {
        errorMessage.innerHTML = " "; 
    } else {
        errorMessage.innerHTML = "Var vänlig skriv i en giltig progression (A, B eller C)";
    }

    courseInfoEl.appendChild(codeSpan);
    courseInfoEl.appendChild(nameSpan); 
    courseInfoEl.appendChild(progressSpan); 
    courseInfoEl.appendChild(syllabusSpan);
    courseInfoEl.appendChild(document.createElement("br")); 

    courseListEl.appendChild(courseInfoEl); 
    courseListEl.appendChild(errorMessage); 
    courseListEl.appendChild(document.createElement("br")); 

} 

function updateCourse(element: HTMLElement, field: string): void {
    // Hitta närmaste article-elementet som innehåller alla spans för kursinformation
    let courseInfoEl = element.closest("article");

    if (courseInfoEl) {
        // Hitta spans som innehåller kursinformationen
        let spans = courseInfoEl.querySelectorAll("span");

        // Skapa ett objekt för den uppdaterade kursen
        let updatedCourse: Partial<courseInfo> = {};

        // Fyll objektet med uppdaterad information baserat på varje spans position
        spans.forEach((span, index) => {
            switch (index) {
                case 0:
                    updatedCourse.code = span.textContent!;
                    break;
                case 1:
                    updatedCourse.name = span.textContent!;
                    break;
                case 2:
                    updatedCourse.progression = span.textContent!;
                    break;
                case 3:
                    updatedCourse.syllabus = span.textContent!;
                    break;
            }
        });

        // Hämta lagrade kurser från local storage
        let storedCourses = localStorage.getItem("courses");

        // Kontrollera om det finns sparade kurser
        if (storedCourses) {
            let courses: courseInfo[] = JSON.parse(storedCourses);

            // Hitta index för den aktuella kursen i listan
            let courseIndex = courses.findIndex(course => course.code === updatedCourse.code);

            // Uppdatera kursen om den finns i listan
            if (courseIndex !== -1) {
                courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse };
                localStorage.setItem("courses", JSON.stringify(courses));
            }
        }
    }
}