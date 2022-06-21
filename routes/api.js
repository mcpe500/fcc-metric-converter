'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get((req,res)=>{
    var input = req.query.input;
    
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    if(!initNum&&!initUnit){
      res.json('invalid number and unit')
    } else if (!initNum){
      res.json('invalid number')
    } else if (!initUnit){
      res.json('invalid unit')
    }
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    let responseObject = {}
    responseObject['initNum'] = initNum;
    responseObject['initUnit'] = initUnit;
    responseObject['returnNum'] = returnNum;
    responseObject['returnUnit'] = returnUnit;
    responseObject['string'] = toString;
    // if (returnUnit==null&&initNum!=null){
    //   responseObject = 'invalid unit'
    // } else if( returnUnit==null&&!initNum){
    //   responseObject = 'invalid number and unit'
    // }
    res.json(responseObject)
  })

};
