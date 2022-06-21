let inputRegex = (input) => {
  let number = input.match(/[.\d\/]+/g) || ["1"]
  let string = input.match(/[a-zA-Z]+/g)[0]

  return [number[0], string]
}
  // /[a-z]+|[^a-z]+/gi

var checkDiv = (possibleFraction) => {
  let nums = possibleFraction.split("/");
  if(nums.length>2){
    return false;
  }
  return nums;
}

function ConvertHandler() {

  
  this.getNum = function(input) {
    let result;

    result = inputRegex(input)[0]
    let nums = checkDiv(result);

    if(!nums){
      return undefined;
    }
    let num1 = nums[0];
    let num2 =nums[1] || "1";

    result = parseFloat(num1)/parseFloat(num2);

    if(isNaN(num1)||isNaN(num2)){
      return undefined
    }
    // console.log("initNum = "+result)
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = inputRegex(input)[1]
    var units = ['gal','lbs','mi','l','kg','km']
    // console.log("initUnit = "+result)
    if (units.indexOf(result.toLowerCase())==-1){
      return undefined
    }else if (result.toLowerCase()=='l'){
      return 'L'
    } else {
      return result.toLowerCase()
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    if (initUnit.toLowerCase() == 'gal'){
      result = 'L'
    } else if (initUnit.toLowerCase() == 'lbs'){
      result = 'kg'
    } else if (initUnit.toLowerCase() == 'mi'){
      result = 'km'
    } else if (initUnit.toLowerCase() == 'l'){
      result = 'gal'
    } else if (initUnit.toLowerCase() == 'kg'){
      result = 'lbs'
    } else if (initUnit.toLowerCase() == 'km'){
      result = 'mi'
    } else {
      return undefined
    }
    // console.log("returnUnit = "+result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = unit;
      if (result.toLowerCase() == 'gal'){
        return 'gallons'
      } else if (result.toLowerCase() == 'lbs'){
        return 'pounds'
      } else if (result.toLowerCase() == 'mi'){
        return 'miles'
      } else if (result.toLowerCase() == 'l'){
        return 'liters'
      } else if (result.toLowerCase() == 'kg'){
        return 'kilograms'
      } else if (result.toLowerCase() == 'km'){
        return 'kilometers'
      }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit.toLowerCase() == 'gal'){
      result = (initNum * galToL)
    } else if (initUnit.toLowerCase() == 'lbs'){
      result = (initNum * lbsToKg)
    } else if (initUnit.toLowerCase() == 'mi'){
      result = (initNum * miToKm)
    } else if (initUnit.toLowerCase() == 'l'){
      result = (initNum / galToL)
    } 
    else if (initUnit.toLowerCase() == 'kg'){
      result = (initNum / lbsToKg)
    } else if (initUnit.toLowerCase() == 'km'){
      result = (initNum / miToKm)
    } else {
      return null
    }
    // console.log("returnNumber = "+parseFloat(result.toFixed(5)))
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    const longerUnit = (initUnit) => {
      
    }
    if (initNum!=null&&initUnit!=null&&returnNum!=null&&returnUnit!=null){
      result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)
    }
    
    
    return result;
  };
  
}

module.exports = ConvertHandler;
