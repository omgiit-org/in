<!-- Bootstrap JS -->

<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>


<script>

  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  document.getElementById("year").textContent =
    new Date().getFullYear();


  /* =====================================================
     CASCADING LOCATION DATA
     State -> District -> Block -> Village
  ===================================================== */

  const locationData = {

    "Odisha": {

      "Khordha": {
        "Bhubaneswar": [
          "Bhubaneswar",
          "Dumduma",
          "Patia",
          "Mancheswar"
        ],
        "Jatni": [
          "Jatni",
          "Haripur",
          "Nuagaon"
        ]
      },

      "Cuttack": {
        "Cuttack Sadar": [
          "Cuttack",
          "Nuapada",
          "Kandarpur"
        ],
        "Niali": [
          "Niali",
          "Gopinathpur",
          "Nuagaon"
        ]
      },

      "Puri": {
        "Pipili": [
          "Pipili",
          "Durgapur",
          "Ratanpur"
        ],
        "Satyabadi": [
          "Satyabadi",
          "Sakhi Gopal",
          "Balighai"
        ]
      }

    },


    "West Bengal": {

      "Kolkata": {
        "Kolkata": [
          "Alipore",
          "Ballygunge",
          "Behala"
        ]
      },

      "Howrah": {
        "Howrah": [
          "Howrah",
          "Shibpur",
          "Santragachi"
        ]
      }

    },


    "Jharkhand": {

      "Ranchi": {
        "Ranchi": [
          "Ranchi",
          "Kanke",
          "Namkum"
        ]
      },

      "East Singhbhum": {
        "Jamshedpur": [
          "Jamshedpur",
          "Mango",
          "Sakchi"
        ]
      }

    },


    "Chhattisgarh": {

      "Raipur": {
        "Raipur": [
          "Raipur",
          "Abhanpur",
          "Arang"
        ]
      }

    },


    "Andhra Pradesh": {

      "Visakhapatnam": {
        "Visakhapatnam": [
          "Visakhapatnam",
          "Gajuwaka",
          "Madhurawada"
        ]
      }

    }

  };


  const stateSelect =
    document.getElementById("state");

  const districtSelect =
    document.getElementById("district");

  const blockSelect =
    document.getElementById("block");

  const villageSelect =
    document.getElementById("village");


  function resetSelect(select, text) {

    select.innerHTML =
      `<option value="">${text}</option>`;

    select.disabled = true;

  }


  function addOptions(select, values) {

    values.forEach(value => {

      const option =
        document.createElement("option");

      option.value = value;
      option.textContent = value;

      select.appendChild(option);

    });

  }


  /* STATE */

  stateSelect.addEventListener("change", function () {

    resetSelect(
      districtSelect,
      "Select District"
    );

    resetSelect(
      blockSelect,
      "Select Block"
    );

    resetSelect(
      villageSelect,
      "Select Village"
    );


    if (!this.value) {
      return;
    }


    const districts =
      Object.keys(locationData[this.value] || {});


    addOptions(
      districtSelect,
      districts
    );


    districtSelect.disabled = false;

  });


  /* DISTRICT */

  districtSelect.addEventListener("change", function () {

    resetSelect(
      blockSelect,
      "Select Block"
    );

    resetSelect(
      villageSelect,
      "Select Village"
    );


    const state =
      stateSelect.value;

    const district =
      this.value;


    if (!state || !district) {
      return;
    }


    const blocks =
      Object.keys(
        locationData[state][district] || {}
      );


    addOptions(
      blockSelect,
      blocks
    );


    blockSelect.disabled = false;

  });


  /* BLOCK */

  blockSelect.addEventListener("change", function () {

    resetSelect(
      villageSelect,
      "Select Village"
    );


    const state =
      stateSelect.value;

    const district =
      districtSelect.value;

    const block =
      this.value;


    if (!state || !district || !block) {
      return;
    }


    const villages =
      locationData[state][district][block] || [];


    addOptions(
      villageSelect,
      villages
    );


    villageSelect.disabled = false;

  });


  /* =====================================================
     NUMERIC INPUT RESTRICTIONS
  ===================================================== */

  const numericFields = [
    "aadhaar",
    "mobile",
    "alternateMobile",
    "guardianMobile",
    "pincode"
  ];


  numericFields.forEach(id => {

    const field =
      document.getElementById(id);

    field.addEventListener("input", function () {

      this.value =
        this.value.replace(/\D/g, "");

    });

  });


  /* =====================================================
     FILE SIZE VALIDATION
  ===================================================== */

  function validateFileSize(
    input,
    maxSizeKB
  ) {

    if (!input.files.length) {
      return true;
    }


    const file =
      input.files[0];

    const maxBytes =
      maxSizeKB * 500 * 500;


    if (file.size > maxBytes) {

      alert(
        file.name +
        " is too large. Maximum size is " +
        maxSizeKB +
        " KB."
      );

      input.value = "";

      return false;

    }


    return true;

  }


  /* =====================================================
     PHOTO PREVIEW
  ===================================================== */

  document
    .getElementById("studentPhoto")
    .addEventListener("change", function () {

      if (!validateFileSize(this, 2)) {
        return;
      }


      const file =
        this.files[0];

      const preview =
        document.getElementById("photoPreview");


      if (file) {

        preview.src =
          URL.createObjectURL(file);

        preview.style.display =
          "inline-block";

      } else {

        preview.style.display =
          "none";

      }

    });


  /* =====================================================
     SIGNATURE PREVIEW
  ===================================================== */

  document
    .getElementById("studentSignature")
    .addEventListener("change", function () {

      if (!validateFileSize(this, 1)) {
        return;
      }


      const file =
        this.files[0];

      const preview =
        document.getElementById("signaturePreview");


      if (file) {

        preview.src =
          URL.createObjectURL(file);

        preview.style.display =
          "inline-block";

      } else {

        preview.style.display =
          "none";

      }

    });


  /* =====================================================
     CERTIFICATE
  ===================================================== */

  document
    .getElementById("certificate")
    .addEventListener("change", function () {

      if (!validateFileSize(this, 5)) {
        return;
      }


      const file =
        this.files[0];

      const output =
        document.getElementById("certificateName");


      if (file) {

        output.textContent =
          "Selected: " + file.name;

      } else {

        output.textContent = "";

      }

    });


  /* =====================================================
     FORM VALIDATION & SUBMIT
  ===================================================== */

  const form =
    document.getElementById("registrationForm");


  form.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!form.checkValidity()) {

      event.stopPropagation();

      form.classList.add("was-validated");

      const firstInvalid =
        form.querySelector(":invalid");

      if (firstInvalid) {

        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        firstInvalid.focus();

      }

      return;

    }


    /*
      Front-end demo only.

      Connect this form to your PHP/MySQL,
      Node.js, Firebase or other backend
      to actually save registration data.
    */


    alert(
      "Registration submitted successfully!\n\n" +
      "Your application has been received."
    );


    form.reset();

    form.classList.remove("was-validated");


    resetSelect(
      districtSelect,
      "Select District"
    );

    resetSelect(
      blockSelect,
      "Select Block"
    );

    resetSelect(
      villageSelect,
      "Select Village"
    );


    document.getElementById(
      "photoPreview"
    ).style.display = "none";


    document.getElementById(
      "signaturePreview"
    ).style.display = "none";


    document.getElementById(
      "certificateName"
    ).textContent = "";

  });


  /* =====================================================
     RESET
  ===================================================== */

  form.addEventListener("reset", function () {

    setTimeout(() => {

      form.classList.remove("was-validated");

      resetSelect(
        districtSelect,
        "Select District"
      );

      resetSelect(
        blockSelect,
        "Select Block"
      );

      resetSelect(
        villageSelect,
        "Select Village"
      );


      document.getElementById(
        "photoPreview"
      ).style.display = "none";


      document.getElementById(
        "signaturePreview"
      ).style.display = "none";


      document.getElementById(
        "certificateName"
      ).textContent = "";

    }, 10);

  });

</script>