import "./styles/index.css"

import { createProject, ProjectManager } from "./logic/project.js"

import "./templates/projects.js"

import { createDOMProjectCard, renderProjects } from "./templates/projects.js"
import { load } from "./save.js"

load()

const side = document.querySelector('.side')
side.innerHTML = `
<div>
<div class="side__projects">My projects</div>
</div>
`
side.querySelector('.side__projects').onclick = function(){
    renderProjects(ProjectManager)
}


// const grocery = ProjectManager.add({title:'Grocery'})
// const math = ProjectManager.add({title:'Math'})
// const physics = ProjectManager.add({title:'Physics'})
// const task = math.add({title: 'sss', dueDate:'2025-10-15'})

renderProjects(ProjectManager)

// document.querySelectorAll('.projects-card')[1].click()
// console.assert(document.querySelector('button')!==null, 'no button')
// document.querySelector('button').click()