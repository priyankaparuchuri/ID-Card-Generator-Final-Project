document.addEventListener("DOMContentLoaded", init);
const navBarTitle = document.getElementById(COLLAGE_TITLE_ID);
const inputTypeSelectElement = document.getElementById(INPUT_TYPE_SELECTION_ELEMENT_KEY);
const inputElementHolder = document.getElementById(SELECTED_INPUT_TYPE_ELEMENT_ID);
const studentDetailsFormElement = document.getElementById(STUDENT_DETAILS_FORM_ID);
const cardSelectElement = document.getElementById(cardSelectElementKey);
const idCardsContainerElement = document.getElementById(ID_CARD_CONTAINER_KEY);
const pdfDownloadBtnElement = document.getElementById(pdfDownloadBtnKey);

clearPage();
function init(event) {
  loadInitialFields();
}

function loadInitialFields() {
  if (navBarTitle) {
    navBarTitle.innerText = COLLAGE_TITLE;
  }
  if (inputTypeSelectElement) {
    inputTypeSelectElement.addEventListener("change", (e) => {
      clearPage();
      const ele = generateInputTypeElement(e.target.value);
      if (ele) {
        inputElementHolder.appendChild(ele);
      }
    })
  }
}

function readCSVFile() {
  clearOtherSections();
  var files = document.getElementById(CSV_INPUT_FILE_ID).files;
  if (files.length > 0) {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      var csvData = event.target.result.trim();
      var rowData = csvData.split("\n");

      if (rowData < 1) return;
      const formElement = studentDetailsFormElement; formElement.innerHTML = "";
      for (var i = 1; i < rowData.length; i++) {
        const rowColData = rowData[i].trim().split(",");
        formElement.appendChild(generateStudentDetailsField({
          count: i,
          name: rowColData[0].trim(),
          rollNo: rowColData[1].trim(),
          dob: rowColData[2].trim(),
          address: rowColData[3].trim(),
          mobileNumber: rowColData[4].trim(),
        }));
      }

      const btn = document.createElement("div");
      btn.innerHTML = FORM_BUTTONS();
      formElement.appendChild(btn);
      displayElement(studentDetailsFormElement);

      showTab(currentTab);
      studentDetailsFormElement.addEventListener("submit", (e) => { e.preventDefault(); onFormSubmit(); });
    };
  } else {
    alert("Please select a file.");
  }
}

function onCountSubmit(count) {
  clearOtherSections();
  if (count < 1) return;
  const formElement = studentDetailsFormElement;
  formElement.innerHTML = "";
  for (let i = 0; i < count; i++) {
    formElement.appendChild(generateStudentDetailsField({ count: i + 1 }));
  }
  const btn = document.createElement("div");
  btn.innerHTML = FORM_BUTTONS();
  formElement.appendChild(btn);
  displayElement(studentDetailsFormElement)

  showTab(currentTab);
  studentDetailsFormElement.addEventListener("submit", (e) => { e.preventDefault(); onFormSubmit(); });

}

function generateStudentDetailsField(obj) {
  const ele = document.createElement("div");
  ele.classList.add("tab");
  ele.innerHTML = STUDENT_DETAILS_COMPONENT(obj);
  return ele;
}

function clearPage() {
  currentTab = 0;
  clearFields(inputElementHolder, studentDetailsFormElement, idCardsContainerElement);
  hideElement(cardSelectElement);
  hideElement(pdfDownloadBtnElement);
  hideElement(studentDetailsFormElement);
}
function clearOtherSections() {
  currentTab = 0;
  clearFields(studentDetailsFormElement, idCardsContainerElement);
  hideElement(cardSelectElement);
  hideElement(pdfDownloadBtnElement);
  hideElement(studentDetailsFormElement);
}