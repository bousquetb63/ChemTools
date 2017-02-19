//Create element array
var createElement = (elementName, elementSymbol, elementMass, elementNum) => {
  return {
    elementName,
    elementSymbol,
    elementMass,
    elementNum
  };
};
var checkElProperty = (element, prop, val) => {
   return (element[prop] === val);
};
var checkElName = (el, val) => {
  return checkElProperty(el, "elementName", val);
};
var checkElSymbol = (el, val) => {
  return checkElProperty(el, "elementSymbol", val);
};

var getElement = (elements, str) =>
{
  for (var i = 0; i < elements.length; i++)
  {
    if (checkElName(elements[i], str) || checkElSymbol(elements[i], str)) {
      return elements[i];
    }
  }
};
var splitEquationToFormulas = (eq) =>
{
  var formulas = eq.replace(regSpace, '').split("+");
  return formulas;
};
var regSpace = /\s/g;
var regNum = /^[0-9]+$/;
var regCaseUpper = /[A-Z]/;
var regCaseLower = /[a-z]/;
var getCoefficient = (formula) => {
  return regNum.test(formula[0]) ? parseInt(formula[0]) : 1;
}
var partitionCoefficient = (compound) => {
  var coefficient = getCoefficient(compound);
  if (coefficient != 1)
  {
    compound = compound.substr(1);
  }
  return {coefficient, compound};
}
var tallyElements = (compound) => {
  var {coefficient, compound} = partitionCoefficient(compound);
  var tally = {};
  var i = 0;
  var count = compound.length;
  while (i < count){
    var elName = "";
    if (regCaseUpper.test(compound[i])){
      elName += compound[i];
      i++;
      if(regCaseLower.test(compound[i])){
        elName += compound[i];
        i++;
        if(regCaseLower.test(compound[i])){
          elName += compound[i];
          i++;
        }
      }
    }
    tally[elName] = 1;
    if (regNum.test(compound[i])){
      tally[elName] = parseInt(compound[i]);
      i++;
    }
    tally[elName] *= coefficient;
  }
  return tally;
}
// console.log(checkChemicalBalance("CH4 + O2", "CO2 + H20"));
function checkChemicalBalance(reactant, product) {
//getCoefficient -> check if coefficient is bigger than 1
//partitionCoefficient -> remove coefficient multiply
//tallyElements
}
