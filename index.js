let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const emptyError = document.getElementById("empty-error");
const clearBtn = document.getElementById("clear-btn");
const doubleClick = document.getElementById("double-click");
const tabBtn = document.getElementById("tab-btn");
inputEl.value = "https://";

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  doubleClick.textContent = "";
  emptyError.textContent = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

clearBtn.addEventListener("click", function () {
  doubleClick.textContent = "Double click the button to clear leads";
});

clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (document.getElementById("input-el").value.length == 0) {
    emptyError.textContent = "Empty input. Enter a lead before saving.";
  } else {
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = "https://";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
});
