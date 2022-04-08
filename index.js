let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const emptyError = document.getElementById("empty-error");
const clearBtn = document.getElementById("clear-btn");
const doubleClick = document.getElementById("double-click");
inputEl.value = "";

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

clearBtn.addEventListener("click", function () {
  doubleClick.textContent = "Double click the button to clear leads";
});

clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});

inputBtn.addEventListener("click", function () {
  if (document.getElementById("input-el").value.length == 0) {
    emptyError.textContent = "Empty input. Enter a lead before saving.";
  } else {
    myLeads.push(inputEl.value);
    renderLeads();
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
});
function renderLeads() {
  let listItems = "";
  doubleClick.textContent = "";
  emptyError.textContent = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='https://${myLeads[i]}'>
        https://${myLeads[i]}
        </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}
