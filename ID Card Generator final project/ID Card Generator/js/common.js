function hideElement(element) {
  if (element) element.style.display = "none";
}
function displayElement(element, property = "block") {
  if (element) element.style.display = property;
}


function clearFields(...fields) {
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    element.innerHTML = "";

  }
}

function onFormSubmit() {
  if (studentDetailsFormElement.checkValidity()) {
    displayElement(cardSelectElement);
    const selectElement = cardSelectElement.querySelector("#input-type-selection");
    selectElement.value = "";
    idCardsContainerElement.innerHTML = "";
    hideElement(pdfDownloadBtnElement);
    selectElement?.addEventListener("change", (e) => {
      onCardSelectionChange(selectElement.value);
    })
  }
}

function getStudentsInformation() {

  let studentDetails = [];
  const studentInfoEle = studentDetailsFormElement.querySelectorAll(".tab");
  for (let i = 1; i <= studentInfoEle.length; i++) {
    const element = studentInfoEle[i - 1];
    let studentInfo = {};
    studentInfo["collageName"] = COLLAGE_NAME;
    studentInfo["profileImage"] = element.querySelector(`#student-profile-${i}`).files[0];
    studentInfo["studentName"] = element.querySelector(`#student-name-${i}`).value;
    studentInfo["rollNo"] = element.querySelector(`#student-roll-number-${i}`).value;
    studentInfo["dateOfBirth"] = element.querySelector(`#student-dob-${i}`).value;
    studentInfo["address"] = element.querySelector(`#student-address-${i}`).value;
    studentInfo["mobileNumber"] = element.querySelector(`#student-mobile-${i}`).value;
    studentDetails.push(studentInfo);
  }
  return studentDetails;
}

function onCardSelectionChange(type) {
  idCardsContainerElement.innerHTML = "";
  hideElement(pdfDownloadBtnElement);
  const studentData = getStudentsInformation();

  for (let index = 0; index < studentData.length; index++) {
    let stdFields = { ...studentData[index] };

    const ele = document.createElement("div");
    idCardsContainerElement.appendChild(ele);

    switch (type) {
      case "VS":
        ele.innerHTML = VERTICAL_SINGLE_SIDE_ID_CARD(stdFields);
        generateBarCode(stdFields["rollNo"], stdFields["rollNo"]);
        loadImage(ele, stdFields);
        break
      case "HS":
        ele.innerHTML = HORIZONTAL_SINGLE_SIDE_ID_CARD(stdFields);
        generateBarCode(stdFields["rollNo"], stdFields["rollNo"]);
        loadImage(ele, stdFields);
        break
      case "VD":
        ele.innerHTML = VERTICAL_DOUBLE_SIDE_ID_CARD(stdFields);
        generateBarCode(stdFields["rollNo"], stdFields["rollNo"], true);
        generateQrCode(stdFields["rollNo"], stdFields["rollNo"]);
        loadImage(ele, stdFields);
        break
      case "HD":
        ele.innerHTML = HORIZONTAL_DOUBLE_SIDE_ID_CARD(stdFields);
        generateBarCode(stdFields["rollNo"], stdFields["rollNo"], true);
        generateQrCode(stdFields["rollNo"], stdFields["rollNo"]);
        loadImage(ele, stdFields);
        break
      default:
        ele.innerHTML = VERTICAL_SINGLE_SIDE_ID_CARD(stdFields);
        generateQrCode(stdFields["rollNo"], stdFields["rollNo"]);
        loadImage(ele, stdFields);
        break;
    }

    // displayElement(pdfDownloadBtnElement);
    // pdfDownloadBtnElement.addEventListener("click", (e) => onDownloadPdf());

  }
}

function generateBarCode(id, value, displayText = false) {
  JsBarcode(`#barcode-${id}`, value, {
    format: "code128",
    displayValue: displayText,
    width: 1.2,
    height: "20",
    fontSize: 12,
  });

}
function generateQrCode(id, value) {
  var qrCodeContainer = document.getElementById(`qrcode-${id}`);
  var qrCode = new QRCode(qrCodeContainer, {
    text: value,
    width: 128,
    height: 128,
  });
}

function loadImage(ele, values) {
  var reader = new FileReader();

  reader.onload = function (e) {
    ele.querySelector(".profile-image").src = e.target.result;
  };
  reader.readAsDataURL(values["profileImage"]);
}

function onDownloadPdf() {
  html2pdf().from(idCardsContainerElement).save();
}