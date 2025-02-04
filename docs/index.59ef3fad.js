const t=document.getElementById("table");addEventListener("load",async function(){try{var e;let r;let n=await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");if(!n.ok)throw Error("Invalid response!");e=await n.json(),r="",e.forEach(t=>{r+=`<tr>
            <td><a target="_blank" href="${t.syllabus}">${t.code}</a></td>
            <td>${t.coursename}</td>
            <td>${t.progression}</td>
        </tr>`}),t.innerHTML=r}catch(e){console.error(e),t.innerHTML="<tr><td>Ett</td><td>Problem</td><td>Uppstod!</td></tr>"}});