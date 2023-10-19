function checkEmpty(val) {
  return !val || !val.length || !Object.keys(val).length;
}

const checkValidForm = (values) => {
  if (checkEmpty(values)) return true;

  if (Array.isArray(values)) {
    return values.every((val) => checkValidForm(val));
  }

  for (const val of [...Object.values(values)]) {
    if (!checkValidForm(val)) return false;
  }

  return true;
};

console.log(checkValidForm([{ msg: "abc" }, {}]));
