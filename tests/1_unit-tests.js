const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler getNum(input)',()=>{
    test('whole number input',(done)=>{
      const input = '5gal'
      assert.equal(convertHandler.getNum(input),5)
      done()
    });
    
    test('decimal number input',(done)=>{
      const input = '1.5gal'
      assert.equal(convertHandler.getNum(input),1.5)
      done()
    });

    test('fractional number input',(done)=>{
      const input = '1/5gal'
      assert.equal(convertHandler.getNum(input),0.2)
      done()
    });

    test('fractional with decimal number input',(done)=>{
      const input = '1/5.8gal'
      assert.equal(convertHandler.getNum(input),0.1724137931034483)
      done()
    });
    
    test('invalid double fractional number input',(done)=>{
      const input = '1/5/8gal'
      assert.equal(convertHandler.getNum(input), undefined)
      done()
    });

    test('default number input is 1',(done)=>{
      const input = 'gal'
      assert.equal(convertHandler.getNum(input),1)
      done()
    });

  });

  suite('convertHandler getUnit(input)',()=>{
    
    test('each valid unit input',(done)=>{
      const input = ['gal','l','mi','km','lbs','kg'];
      input.forEach(unit => {
        assert.equal(convertHandler.getUnit(unit),unit=='l'?'L':unit)
      })
      done()
    });
    
    test('each invalid unit input',(done)=>{
      const input = ['kfg','kdas'];
      input.forEach(unit => {
        assert.equal(convertHandler.getUnit(unit),undefined)
      })
      done()
    });

    test('each valid unit input',(done)=>{
      const input = ['gal','l','mi','km','lbs','kg'];
      const returnInput = ['L','gal','km','mi','kg','lbs']
      for (let i = 0;i<input.length;i++){
        assert.equal(convertHandler.getUnit(input[i]),convertHandler.getReturnUnit(returnInput[i]))
      }
      done()
    });
    
  });
  suite('convertHandler spellOutUnit(input)',()=>{
    test('correctly return the spelled-out string unit for each valid input unit',(done)=>{
      var input = ['gal','l','mi','km','lbs','kg'];
      var returnInput = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      for (let i = 0;i<input.length;i++){
        assert.equal(convertHandler.spellOutUnit(input[i]),returnInput[i])
      }
      done()
    });    
  });
  suite('convertHandler convert',()=>{
    test('gal to L',(done)=>{
      const input = '5gal'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(18.92705))
      done()
    });

    test('L to gal',(done)=>{
      const input = '2l'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(0.52834))
      done()
    });

    test('mi to km',(done)=>{
      const input = '2mi'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(3.21868))
      done()
    });

    test('km to mi',(done)=>{
      const input = '4km'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(2.48549))
      done()
    });

    test('lbs to kg',(done)=>{
      const input = '4lbs'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(1.81437))
      done()
    });

    test('kg to lbs',(done)=>{
      const input = '4kg'
      const number = convertHandler.getNum(input);
      const string = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(number,string),(8.81850))
      done()
    });
  })
});