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
var getCoefficient = (formula) => {
  return regNum.test(formula[0]) ? parseInt(formula[0]) : 1;
}
// console.log(checkChemicalBalance("CH4 + O2", "CO2 + H20"));
function checkChemicalBalance(reactant, product) {

}
