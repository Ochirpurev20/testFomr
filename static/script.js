const elements = {
  readBtn: document.querySelector(".readBtn"),
  updateBtn: document.querySelector(".updateBtn"),
  createBtn: document.querySelector(".createBtn"),
  deleteBtn: document.querySelector(".deleteBtn"),
  home: document.querySelector(".home"),
  list: document.querySelector(".listLink"),
  uusgeh: document.querySelector(".createLink"),
  contentDiv: document.querySelector(".content"),
  title: document.getElementById("title"),
  content: document.getElementById("content"),
};
// const clearAll = () => {
//   elements.contentDiv.innerHTML = "";
// };
let createFn = () => {
  let title = elements.title.value;
  let content = elements.content.value;
  alert(`title is : ${title} and content is : ${content}`);
};
function testFn() {
  alert("create func dotroos");
}
// const start = () => {
//   clearAll();
// };

const deleteFn = () => {
  alert("deleted");
};

//   clearAll();
//   const listTalbar = `

//   `;
//   elements.contentDiv.insertAdjacentHTML("afterbegin", listTalbar);

// };

//if (elements.home) elements.home.addEventListener("click", start);

//if (elements.uusgeh) elements.uusgeh.addEventListener("click", uusgeh);
//if (elements.list) elements.list.addEventListener("click", list);
if (elements.createBtn) elements.createBtn.addEventListener("click", createFn);
if (elements.readBtn) elements.readBtn.addEventListener("click", testFn);
if (elements.updateBtn) elements.updateBtn.addEventListener("click", testFn);
if (elements.deleteBtn) elements.deleteBtn.addEventListener("click", deleteFn);
