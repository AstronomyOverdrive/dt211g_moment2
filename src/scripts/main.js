"use strict";

// Declare variables
let scheduleData;
let reverseSort = false;
let lastSort;
const tableBody = document.getElementById("table");
const sortCode = document.getElementById("sortCode");
const sortName = document.getElementById("sortName");
const sortProg = document.getElementById("sortProg");
const searchBar = document.getElementById("searchBar");

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

function populateTable(data){ // Write to DOM
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

function sortData(sortBy){
    let sortedData = [].concat(scheduleData); // Concat prevents .sort from changing scheduleData
    if (sortBy === lastSort){
        reverseSort = !reverseSort; // Toggle sorting direction
    } else {
        reverseSort = false;
    }
    lastSort = sortBy;
    switch (sortBy){ // Sort after desired attribute
        case 1:
            sortedData.sort((a, b) => a.code > b.code ? 1 : -1);
            break;
        case 2:
            sortedData.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
            break;
        case 3:
            sortedData.sort((a, b) => a.progression > b.progression ? 1 : -1);
            break;
        default:
            sortedData.sort((a, b) => a.code > b.code ? 1 : -1);
    }
    if (reverseSort){
        populateTable(sortedData.reverse());
    } else {
        populateTable(sortedData);
    }
}

function filterData(){
    const searchFor = searchBar.value.toLowerCase(); // User input in lowercase
    const filteredData = scheduleData.filter(course => course.code.toLowerCase().includes(searchFor) || course.coursename.toLowerCase().includes(searchFor));
    populateTable(filteredData);
}

// Event handlers
addEventListener("load", getJSON);
sortCode.addEventListener("click", () => sortData(1));
sortName.addEventListener("click", () => sortData(2));
sortProg.addEventListener("click", () => sortData(3));
searchBar.addEventListener("keyup", filterData);
