function generateInputTypeElement(type) {
  switch (type) {
    case "CSV":
      return _generateCSVInputType();
    case "MANUAL":
      return _generateCountInputType();
    default:
      return undefined
  }
}


function _generateCSVInputType() {
  const customInput = document.createElement("div");
  customInput.classList.add("custom-input");

  const label = document.createElement("label");
  label.setAttribute("for", CSV_INPUT_FILE_ID);

  const labelElement = document.createElement("div");
  labelElement.classList.add("label");
  labelElement.innerText = "CSV File";

  const infoBtnWrapper = document.createElement("div");
  infoBtnWrapper.classList.add("info-button-wrapper");

  const csvFileName = document.createElement("div");
  csvFileName.id = CSV_INPUT_FILE_NAME_ID;
  csvFileName.innerText = "Select CSV File";

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "button");
  submitButton.innerText = "Submit";
  submitButton.onclick = (x, y) => readCSVFile();

  const inputElement = document.createElement("input");
  inputElement.id = CSV_INPUT_FILE_ID;
  inputElement.setAttribute("accept", ".csv");
  inputElement.setAttribute("type", "file");
  inputElement.style.display = "none";
  inputElement.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      csvFileName.innerText = e.target.files[0].name;
    }
  })

  infoBtnWrapper.appendChild(csvFileName);
  infoBtnWrapper.appendChild(submitButton);

  label.appendChild(labelElement);
  label.appendChild(inputElement);
  label.appendChild(infoBtnWrapper);

  customInput.appendChild(label);

  return customInput;

}
function _generateCountInputType() {
  const customInputForm = document.createElement("form");
  customInputForm.classList.add("custom-input");

  const label = document.createElement("label");
  label.setAttribute("for", COUNT_INPUT_ELEMENT_ID);

  const labelElement = document.createElement("div");
  labelElement.classList.add("label");
  labelElement.innerText = "No of ID Cards";

  const infoBtnWrapper = document.createElement("div");
  infoBtnWrapper.classList.add("info-button-wrapper");

  const inputElement = document.createElement("input");
  inputElement.classList.add("w-100");
  inputElement.id = COUNT_INPUT_ELEMENT_ID;
  inputElement.setAttribute("required", "true");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("placeholder", "Enter Count");
  // inputElement.onsubmit = (x, y) => onsubmit(e.target.value);


  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit";
  submitButton.onenter = (x, y) => onCountSubmit(inputElement.value);

  infoBtnWrapper.appendChild(inputElement);
  infoBtnWrapper.appendChild(submitButton);

  label.appendChild(labelElement);
  label.appendChild(infoBtnWrapper);

  customInputForm.appendChild(label);
  // selectWrapper.appendChild(customInputForm);
  customInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onCountSubmit(inputElement.value)

  })

  return customInputForm;

}

const STUDENT_DETAILS_COMPONENT = ({ count = 0, name = "", rollNo = "", dob = "", address = "", mobileNumber = "" }) => {
  // <div class="form-element" data-count="${count}">
  return `
  <div class="student-details">
  <div class="row">
    <div class="col-md mb-2">
      <label for="student-name-${count}" class="form-label">Name</label>
      <input required type="text" class="form-control" id="student-name-${count}" placeholder="Enter Full Name"
        value="${name}" name="studentName" />
    </div>
    <div class="col-md mb-2">
      <label for="student-roll-number-${count}" class="form-label">Roll No</label>
      <input required type="text" class="form-control" id="student-roll-number-${count}" placeholder="Enter Roll No"
        value="${rollNo}" name="studentRollNumber" />
    </div>
    <div class="col-md mb-2">
      <label for="student-dob-${count}" class="form-label">Date Of Birth</label>
      <input required type="date" class="form-control" id="student-dob-${count}" placeholder="Enter DOB" value="${dob}"
        name="studentDOB" />
    </div>
  </div>
  <div class="row">
    <div class="col-md mb-2">
      <label for="student-address-${count}" class="form-label">Address</label>
      <input required type="text" class="form-control" id="student-address-${count}" placeholder="Enter Address"
        value="${address}" name="studentAddress" />
    </div>
    <div class="col-md mb-2">
      <label for="student-mobile-${count}" class="form-label">Mobile No</label>
      <input required type="number" class="form-control" id="student-mobile-${count}" placeholder="Enter Mobile Number"
        value="${mobileNumber}" name="studentMobileNumber"/>
    </div>
    <div class="col-md mb-2">
      <label for="student-profile-${count}" class="form-label">Photo</label>
      <input required type="file" accept="images/*" class="form-control" id="student-profile-${count}" />
    </div>
  </div>
</div>
    `;
  // </div>
};

const FORM_BUTTONS = () => `
 <div style="overflow:auto;" class="mt-3">
     <div style="float:right;">
         <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
         <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
     </div>
 </div>
  `;

  const VERTICAL_SINGLE_SIDE_ID_CARD = ({ collageName, profileImage, studentName, rollNo, dateOfBirth, mobileNumber, address }) => {
    return `
    <div class="vertical-id single-side" id="id-${rollNo}">
    <div class="flex-center id-container">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <img class="profile-image" src="" alt="" srcset="" />
          <div class="student-name">${studentName}</div>
        </div>
        <div class="student-additional-info flex-center">
          <div class="student-basic-info">
            <div class="student-info">
              <div class="roll-number heading">Roll No :</div>
              <div class="roll-number value">${rollNo}</div>
  
              <div class="date-of-birth heading">DOB :</div>
              <div class="date-of-birth value">${dateOfBirth}</div>
  
              <div class="mobile-number heading">Mobile :</div>
              <div class="mobile-number value">${mobileNumber}</div>
            </div>
            <div class="address">${address}</div>
          </div>
          <svg class="barcode" id="barcode-${rollNo}"></svg>
        </div>
      </div>
    </div>
  </div>
    `;
  };
  const HORIZONTAL_SINGLE_SIDE_ID_CARD = ({ collageName, profileImage, studentName, rollNo, dateOfBirth, mobileNumber, address }) => {
    return `
    <div class="horizontal-id single-side" id="id-${rollNo}">
    <div class="flex-center id-container">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <img class="profile-image" src="" alt="" srcset="" />
          <div class="student-name">${studentName}</div>
        </div>
        <div class="student-additional-info flex-center">
          <div class="student-basic-info">
            <div class="student-info">
              <div class="roll-number heading">Roll No :</div>
              <div class="roll-number value">${rollNo}</div>
  
              <div class="date-of-birth heading">DOB :</div>
              <div class="date-of-birth value">${dateOfBirth}</div>
  
              <div class="mobile-number heading">Mobile :</div>
              <div class="mobile-number value">${mobileNumber}</div>
            </div>
            <div class="address">${address}</div>
          </div>
          <svg class="barcode" id="barcode-${rollNo}"></svg>
        </div>
      </div>
    </div>
  </div>
    `;
  };
  const VERTICAL_DOUBLE_SIDE_ID_CARD = ({ collageName, profileImage, studentName, rollNo, dateOfBirth, mobileNumber, address }) => {
    return `
    <div class="vertical-id double-side" id="id-${rollNo}">
    <div class="flex-center id-container front">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <img class="profile-image" src="" alt="" srcset="" />
          <div class="student-name">${studentName}</div>
        </div>
        <div class="student-additional-info flex-center">
          <svg class="barcode" id="barcode-${rollNo}"></svg>
        </div>
      </div>
    </div>
    <div class="flex-center id-container back">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <div class="qrcode" id="qrcode-${rollNo}"></div>
        </div>
        <div class="student-additional-info flex-center">
          <div class="student-basic-info">
            <div class="student-info">
              <div class="roll-number heading">Roll No :</div>
              <div class="roll-number value">${rollNo}</div>
  
              <div class="date-of-birth heading">DOB :</div>
              <div class="date-of-birth value">${dateOfBirth}</div>
  
              <div class="mobile-number heading">Mobile :</div>
              <div class="mobile-number value">${mobileNumber}</div>
            </div>
            <div class="address">${address}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  };
  const HORIZONTAL_DOUBLE_SIDE_ID_CARD = ({ collageName, profileImage, studentName, rollNo, dateOfBirth, mobileNumber, address }) => {
    return `
    <div class="horizontal-id double-side" id="id-${rollNo}">
    <div class="flex-center id-container front">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <img class="profile-image" src="" alt="" srcset="" />
        </div>
        <div class="student-additional-info flex-center">
          <div class="student-name">${studentName}</div>
          <svg class="barcode" id="barcode-${rollNo}"></svg>
        </div>
      </div>
    </div>
    <div class="flex-center id-container back">
      <div class="collage-name">${collageName}</div>
      <div class="student-full-info">
        <div class="profile-name flex-center">
          <div class="qrcode" id="qrcode-${rollNo}"></div>
        </div>
        <div class="student-additional-info flex-center">
          <div class="student-basic-info">
            <div class="student-info">
              <div class="roll-number heading">Roll No :</div>
              <div class="roll-number value">${rollNo}</div>
  
              <div class="date-of-birth heading">DOB :</div>
              <div class="date-of-birth value">${dateOfBirth}</div>
  
              <div class="mobile-number heading">Mobile :</div>
              <div class="mobile-number value">${mobileNumber}</div>
            </div>
            <div class="address">${address}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  };
  