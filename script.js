const inputTask = document.getElementById("inputTask")
const addButton = document.getElementById("addButton")
const taskItems = document.getElementById("taskItems")

loadTasks(); 

function addTasks() {

    const tasks = inputTask.value.trim();

    if(tasks) {

        createTasks(tasks)

        inputTask.value = '';   

        saveTasks()

    } else {
        alert("Please Enter Task First")
    }

}

addButton.addEventListener('click', addTasks)

function createTasks(tasks) {
    const listItem = document.createElement('li');

    listItem.textContent = tasks;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = 'deleteTask'

    listItem.appendChild(deleteButton)
    taskItems.appendChild(listItem);

    deleteButton.addEventListener('click', function() {
        taskItems.removeChild(listItem);
        saveTasks();
    })
}

function saveTasks() {
    let tasks = []
    
    taskItems.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.replace('Delete', '').trim())
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || [])

    tasks.forEach(createTasks)
}