// Unit 29. To Do List ====================================================
// *Влад Чередн, [26.10.21 23:25]

// Список требований: =====================================================
// 1) список должен сохраняться в localstorage
// 2) должен быть поле для ввода, куда пользователь вводит задачу
// 3) при добавлении задачи поле очищается и задача добавляется в список.
// 4) в списке рядом с каждой задачей есть две кнопки. Удалить и выполнить
// 5) при клике на удалить - задача удаляется
// 6) при клике на выполнить - задача перечёркивается и становится в конце списка
// 7) Внизу - блок со статистикой : количество всего задач и количество выполненных задач

// 8) сделать адаптивно и чтобы было красиво

const inputElement = document.querySelector(".input-1");
const taskListElement = document.querySelector(".tasklist");
const errorMessage = document.querySelector(".alertMessage");

const getInput = () => inputElement.value.trim();

const getListFromLS = () =>
  (taskBox = JSON.parse(localStorage.getItem("taskBox")) || []);

const setUpListToLS = (taskBox = []) =>
  localStorage.setItem("taskBox", JSON.stringify(taskBox));

function addNewTask() {
  if (getInput().length === 0) {
    errorMessage.textContent =
      "Error: not enough length. Please, input some text.";
    inputElement.focus();
    return false;
  }
  errorMessage.textContent = "";
  const newList = {
    text: "",
    isComplete: false
  };
  newList.text = getInput();
  getListFromLS();
  taskBox.push(newList);
  setUpListToLS(taskBox);
  inputElement.value = "";
  fillTheList();
}

const clearAll = () => {
  setUpListToLS();
  taskListElement.innerHTML = "";
  getStatistics();
};

document.querySelector(".button-primary").addEventListener("click", addNewTask);
document.querySelector(".button-secondary").addEventListener("click", clearAll);

const createElement = (elementTag, className, innerHTML = "") => {
  const newElement = document.createElement(elementTag);
  newElement.classList.add(className);
  newElement.innerHTML = innerHTML;
  return newElement;
};

const getCompletedItems = (array) =>
  array.filter(({ isComplete }) => isComplete).length;

function fillTheList() {
  console.log(taskListElement.offsetWidth);
  console.log(inputElement);

  taskListElement.innerHTML = "";
  getListFromLS();

  for (const key in taskBox) {
    const toDoButton = createElement(
      "div",
      "todo-button",
      `<div class="material-icons-outlined md-18">check</div>`
    );
    const toDelButton = createElement(
      "div",
      "delete-button",
      `<div class="material-icons md-18">clear</div>`
    );
    const markReady = createElement(
      "div",
      "icon_ready",
      `<div class="material-icons-outlined md-18">done_all</div>`
    );
    const itemDiv = createElement(
      "li",
      "item",
      `<span><li>${taskBox[key].text} </li></span>`
    );
    const itemDivButtons = createElement("div", "item-buttons", "");
    itemDivButtons.appendChild(toDoButton);
    itemDivButtons.appendChild(toDelButton);
    itemDiv.appendChild(itemDivButtons);
    taskListElement.appendChild(itemDiv);

    if (taskBox[key].isComplete) {
      itemDiv.classList.add("completed");
      itemDivButtons.replaceChild(markReady, toDoButton);
    }
  }
  setUpListToLS(taskBox);
  getStatistics();
  inputElement.focus();
}

function getStatistics() {
  document.querySelector(".stats__total").innerHTML = getListFromLS().length;
  document.querySelector(".stats__completed").innerHTML =
    getCompletedItems(taskBox);
}

fillTheList();

taskListElement.addEventListener("click", taskManagement);

function taskManagement(event) {
  if (event.path[1].className === "todo-button") {
    for (const key in taskBox) {
      if (taskBox[key].text === event.path[3].children[0].innerText.trim()) {
        taskBox[key].isComplete = true;
        taskBox.push(taskBox[key]);
        taskBox.splice([key], 1);
        setUpListToLS(taskBox);
        fillTheList();
      }
    }
  }

  if (event.path[1].className === "delete-button") {
    for (const key in taskBox) {
      if (taskBox[key].text === event.path[3].children[0].innerText.trim()) {
        taskBox.splice([key], 1);
        setUpListToLS(taskBox);
        fillTheList();
      }
    }
  }
}

// event.target.className === "todo-button" ||
// event.target.className === "delete-button" ||

// taskBox[key].text === event.path[2].children[0].innerText.trim() ||
// taskBox[key].text === event.path[2].children[0].innerText.trim() ||
