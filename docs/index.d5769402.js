!function(){let e,t;let n=!1,o=document.getElementById("table"),r=document.getElementById("sortCode"),s=document.getElementById("sortName"),d=document.getElementById("sortProg"),c=document.getElementById("searchBar");function a(e){let t="";e.forEach(e=>{t+=`<tr>
            <td><a target="_blank" href="${e.syllabus}">${e.code}</a></td>
            <td>${e.coursename}</td>
            <td>${e.progression}</td>
        </tr>`}),o.innerHTML=t}function i(o){let r=[].concat(e);switch(n=o===t&&!n,t=o,o){case 1:default:r.sort((e,t)=>e.code>t.code?1:-1);break;case 2:r.sort((e,t)=>e.coursename>t.coursename?1:-1);break;case 3:r.sort((e,t)=>e.progression>t.progression?1:-1)}n?a(r.reverse()):a(r)}addEventListener("load",async function(){try{let t=await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");if(!t.ok)throw Error("Invalid response!");e=await t.json(),a(e)}catch(e){console.error(e),o.innerHTML="<tr><td>Ett</td><td>Problem</td><td>Uppstod!</td></tr>"}}),r.addEventListener("click",()=>i(1)),s.addEventListener("click",()=>i(2)),d.addEventListener("click",()=>i(3)),c.addEventListener("keyup",function(){let t=c.value.toLowerCase();a(e.filter(e=>e.code.toLowerCase().includes(t)||e.coursename.toLowerCase().includes(t)))})}();