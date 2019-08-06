export const validations = event => {
  let allInputs = event.target.elements;

  var errors = 0;
  var returnErrors = [];

  for (let a = 0; a < allInputs.length; a++) {
    let requiredClass = allInputs[a].classList.contains("is_required");
    let requiredValue = allInputs[a].value;
    var removeNext = allInputs[a].nextElementSibling;

    if (requiredClass === true && requiredValue === "") {
      if (removeNext === null) {
      } else {
        removeNext.remove();
      }

      allInputs[a].insertAdjacentHTML(
        "afterend",
        '<div style="font-size:12px;color:red">This field is required</div>'
      );
      errors = 1;
    } else {
      if (removeNext === null) {
      } else {
        removeNext.remove();
      }
      allInputs[a].insertAdjacentHTML("afterend", "");
      errors = 0;
    }

    returnErrors.push(errors);
  }

  if (returnErrors.includes(1) === false) {
    return true;
  } else {
    return false;
  }
};

export const serverValidations = (response, fromFields) => {
  Object.keys(response).forEach(function(key, value) {
    if (typeof response === "string") {
      fromFields[key].insertAdjacentHTML("afterend", "");
    } else {
      fromFields[key].insertAdjacentHTML(
        "afterend",
        "<div style='font-size:12px;color:red'>" + response[key][0] + "</div>"
      );
    }
  });
};
