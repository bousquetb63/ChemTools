var checkElProperty = (element, prop, val) => {
   return (element[prop] === val);
};
var checkElName = (el, val) => {
  return checkElProperty(el, "name", val);
};
var checkElSymbol = (el, val) => {
  return checkElProperty(el, "symbol", val);
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
    if (compound[i] && regCaseUpper.test(compound[i])){
      elName += compound[i];
      i++;
      if(compound[i] && regCaseLower.test(compound[i])){
        elName += compound[i];
        i++;
        if(compound[i] && regCaseLower.test(compound[i])){
          elName += compound[i];
          i++;
        }
      }
    }
    tally[elName] = 1;
    if (compound[i] && regNum.test(compound[i])){
      tally[elName] = parseInt(compound[i]);
      i++;
    }
    tally[elName] *= coefficient;
  }
  return tally;
}
var tallyEquationElements = (equation) => {
  return splitEquationToFormulas(equation)
      .map(tallyElements)
      .reduce((acc, tally) => {
        for (var elSymbol in tally) {
          acc[elSymbol] = acc[elSymbol] || 0;
          acc[elSymbol] += tally[elSymbol];
        }
        return acc;
      }, {});
}
// console.log(checkChemicalBalance("CH4 + O2", "CO2 + H20"));
var checkChemicalBalance = (reactant, product) => {
  var tally1 = tallyEquationElements(reactant);
  var tally2 = tallyEquationElements(product);
  // console.table([tally1, tally2]);
  var tallyKeys1 = Object.keys(tally1);
  var tallyKeys2 = Object.keys(tally2);
  if (tallyKeys1.length === tallyKeys2.length)
  {
    for (var i = 0; i < tallyKeys1.length; i++)
    {
      var key = tallyKeys1[i];
      if (tally1[key] !== tally2[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var calcMass = (eq) => {
  var tally = tallyEquationElements(eq);
  var sum = 0;
  for (var elSymbol in tally){
    sum += tally[elSymbol]* parseFloat(getElement(elements, elSymbol).atomicMass);
  }
  return sum;
};
