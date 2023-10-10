const newTaskInput = document.getElementById("inputField");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, removeTask ;
let updateNote ="";
let count;


window.onload = () => {
  updateNote = "";

  count = Object.keys(localStorage).length;
  displayTasks();
};

//Function to display the Tasks

const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    taskDivs.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  // clear the tasks
  tasksDiv.innerHTML = "";

  //Fetch all the keys in local storage

  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();
for (let key of tasks) {
  let classValue = "";

    //get all value

    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id = "taskname"> ${
      key.split("_")[1]
    } </span>`;
    let editBUtton = document.createElement("button");
    editBUtton.classList.add("edit");
    editBUtton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    if (!JSON.parse(value)) {
      editBUtton.style.visibility = "visible";
    } else {
      editBUtton.style.visibility = "hidden";
      
    }
    taskInnerDiv.appendChild(editBUtton);
    taskInnerDiv.innerHTML += `<button class ="delete"> <i class="fa-solid fa-trash"></i></button>`;
  tasksDiv.appendChild(taskInnerDiv);
  }
      // tasks append child

      

};  // Edit tasks

editTasks = document.getElementsByClassName("edit");
Array.from(editTasks).forEach((element, index) => 
{ element.addEventListener("click", (e) => {


  //stop propogation to outer element if removed when 
  //we click eventually rhw click will move to parent
  e.stopPropagation(); 
  // disable outer edit buttons when one task is being edited 
  disableButtons(true);
  // update input value and remove div
  let parent = element.parentElement;
  newTaskInput.value = parent.querySelector("#taskname").innerHTML;
// setupdateNOte to the task that is being edited
updateNote = parent.id;

//remove task

parent.remove();

});
});
//Delete task

deleteTasks = document.getElementsByClassName("delete");
Array.from(deleteTasks).forEach((element, index) => {
  e.stopPropagation();

  // Delete from local storage and remove div 
  let parent = element.parentElement;
  removeTask(parent.index);
  parent.remove();
  count -=1;
})



const updateStorage = (index, taskValue) => 
 {
  localStorage.setItem(`${index}_${taskValue}`);
displayTasks();

};

//Function to add new task

document.querySelector("#push").addEventListener("click" , () => {
  //Enable the edite button

  // disableButtons(false);
  if (newTaskInput.value.length == 0){
    alert("PLease Enter a task")
  }  
  else {
    if ( updateNote = ""){
      updateStorage(count, newTaskInput.value, false);

    }
  
  
  else  // update task
    { let existingCount = updateNote.split("_")[0];
   
    updateStorage(existingCount, newTaskInput.value, false);
    updateNote ="";
}
count += 1;
newTaskInput.value = "";
  }



});
