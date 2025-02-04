"use strict";

// Declare variables
let scheduleData;
const tableBody = document.getElementById("table");

// Declare functions
async function getJSON(){
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok){
            throw new Error("Invalid response!");
        }
        scheduleData = await response.json();
        populateTable(scheduleData);
    } catch (error){
        console.error(error);
        tableBody.innerHTML = "<tr><td>Ett</td><td>Problem</td><td>Uppstod!</td></tr>";
    }
}

function populateTable(data){
    let tableHTML = "";
    data.forEach(course => {
        tableHTML +=
        `<tr>
            <td><a target="_blank" href="${course.syllabus}">${course.code}</a></td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        </tr>`;
    });
    tableBody.innerHTML = tableHTML;
}

// Event handlers
addEventListener("load", getJSON);
