// Start Declearing Variables
const addBtn = document.querySelector(".add");
const overlay = document.querySelector(".overlay");
const formCont = document.querySelector(".add-form");
const addTask = document.querySelector(
  ".add-form form > div:nth-child(2) .options .add-task"
);
const counter = document.querySelector(".count");
const form = formCont.children[1];
let tasks = [];
const nameInput = form.children[0].children[0];
const taskInput = form.children[1].children[0];
const widgets = document.querySelector(".widgets");
// End Declearing Variables

// Start Implement Functions

const data = {
  getData() {
    return JSON.parse(localStorage.getItem("tasks-data"));
  },

  setAllData(data) {
    localStorage.removeItem('tasks-data')
    localStorage.setItem("tasks-data", JSON.stringify(data));
  },

  setData(title, array) {
    let list = {
      lsTitle: title,
      lsTasks: array,
    };
    let storageData = [];
    if (localStorage.getItem("tasks-data")) {
      storageData = JSON.parse(localStorage.getItem("tasks-data"));
      storageData.push(list);
      localStorage.setItem("tasks-data", JSON.stringify(storageData));
    } else {
      storageData.push(list);
      localStorage.setItem("tasks-data", JSON.stringify(storageData));
    }
  },
};

const element = {
  createElement(obj) {
    const list = document.createElement("div");
    list.classList.add("list");

    const heading = document.createElement("h3");
    heading.innerHTML = obj.lsTitle;

    const ul = document.createElement("ul");

    for (let element of obj.lsTasks) {
      const li = document.createElement("li");

      const text = document.createElement("span");
      text.innerHTML = element;

      const options = document.createElement("div");
      options.classList.add("options");

      const del = document.createElement("i");
      del.classList.add("fa-solid", "fa-trash");

      const edit = document.createElement("i");
      edit.classList.add("fa-solid", "fa-edit");

      options.append(del, edit);
      li.append(text, options);
      ul.append(li);
    }

    list.append(heading, ul);
    return list;
  },

  addCustomAttr() {
    const lists = Array.from(document.querySelectorAll(".list"));
    const options = Array.from(document.querySelectorAll(".options"));
    options.forEach((element) => {
      element.setAttribute(
        "data-id",
        lists.indexOf(element.parentElement.parentElement.parentElement)
      );
    });
  },

  createWidgets() {
    widgets.innerHTML = "";
    data
      .getData()
      .forEach((element) => widgets.append(this.createElement(element)));
    this.addCustomAttr();
  },
};

// End Implement Functions

addBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  formCont.classList.add("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  data.setData(nameInput.value, tasks);
  element.createWidgets();
  tasks = [];
  form.reset();
  overlay.classList.remove("active");
  formCont.classList.remove("active");
  counter.innerHTML = 0;
});

addTask.addEventListener("click", () => {
  tasks.push(taskInput.value);
  taskInput.value = ``;
  counter.innerHTML++;
});

element.createWidgets();

const del = document.querySelectorAll(".options i:first-child");

del.forEach((ele) => {
  ele.addEventListener("click", () => {
    let allData = data.getData()
    const dataIndex = ele.parentElement.dataset.id
    const index = data
      .getData()
      [ele.parentElement.dataset.id].lsTasks.indexOf(
        ele.parentElement.previousElementSibling.innerHTML
      );
      allData[dataIndex].lsTasks.splice(index, 1)
      data.setAllData(allData)
      location.reload()
  });
});
