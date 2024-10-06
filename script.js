const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function taskAlreadyExists(taskName) {
    let existingTasks = listContainer.children;
    for (let i = 0; i < existingTasks.length; i++) {
      let listItemText = existingTasks[i].innerHTML.replace(/<span.*?<\/span>/, ''); // Remove the trash icon HTML
      if (listItemText.trim() === taskName) {
        return true;
      }
    }
    return false;
  }
  
  function addTask() {
    if (inputBox.value === '') {
      alert("Please enter a task");
    } else {
      let taskName = inputBox.value;
      let capitalizedTaskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);
      if (taskAlreadyExists(capitalizedTaskName)) {
        alert("Task already exists!");
      } else {
        let li = document.createElement("li");
        li.innerHTML = capitalizedTaskName;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "🗑";
        span.className = "trash-icon";
        li.appendChild(span);
      }
    }
    inputBox.value = "";
    saveData();
  }
listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName ==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();