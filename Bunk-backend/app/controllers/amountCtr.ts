import { RequestHandler, Request, Response } from "express";

// import interfaces
import { ExpenseObj, StringArr, ExpenseArr, DividedArr, payoutsArr, resultObj } from "../Interface";


// This getTotalAmount function gets total amount of every user.
const getTotalAmount = (inputArr: ExpenseArr) => {
  let total = 0;
  inputArr.forEach((item: ExpenseObj) => {
    total += item.amount;
  });
  return total;
};

// This getUniqueNameArr function removes all the duplicated user names and returns a new user name array
const getUniqueNameArr = (inputArr: ExpenseArr) => {
  const nameArr: StringArr = [];
  inputArr.forEach((item: ExpenseObj) => {
    nameArr.push(item.name);
  });
  return [...new Set(nameArr)];
};

// This getNameCount function gets count of different user names from name array
const getNameCount = (inputArr: ExpenseArr) => {
  let count = 0;
  count = getUniqueNameArr(inputArr).length;
  return count;
};

// This getDivdArr function divides expenses array into lower and higher amount array than equalshare
const getDivdArr = (inputArr: ExpenseArr, equalShare: number) => {
  const lowerArr: ExpenseArr = [];
  const higherArr: ExpenseArr = [];
  const uniqueNameArr = getUniqueNameArr(inputArr);
  uniqueNameArr.forEach((item: string) => {
    let amount = 0;
    inputArr.forEach((element: ExpenseObj) => {
      if (element.name === item) amount += element.amount;
    });

    if (amount < equalShare) lowerArr.push({ name: item, amount: amount });
    else higherArr.push({ name: item, amount: amount });
  });
  const dividedArr = {
    lower: lowerArr,
    higher: higherArr,
  };
  return dividedArr;
};

// This getPayoutsArr functions gets an array of payouts which shows all objects of owes, owed and amount.
const getPayoutsArr = (dividedInputArr: DividedArr, equalShare: number) => {
  const lowerArr = dividedInputArr.lower;
  const higherArr = dividedInputArr.higher;
  const payoutsArr: payoutsArr = [];

  let needValue = 0;
  lowerArr.forEach((item: ExpenseObj) => {
    needValue = equalShare - item.amount;
    higherArr.forEach((element: ExpenseObj) => {
      let plusValue = element.amount - equalShare;
      if (plusValue !== 0) {
        let targetValue = needValue > plusValue ? plusValue : needValue;
        element.amount -= targetValue;
        needValue -= targetValue;
        payoutsArr.push({
          owes: item.name,
          owed: element.name,
          amount: targetValue,
        });
      }
    });
  });
  return payoutsArr;
};

// This function gets total, equal share and payouts array from request.
export const calcPayouts: RequestHandler = (req: Request, res: Response) => {
  const inputArr = req.body.expenses;
  const total = getTotalAmount(inputArr);
  const nameCount = getNameCount(inputArr);
  const equalShare = total / nameCount;
  const dividedInputArr = getDivdArr(inputArr, equalShare);
  const payoutsArr = getPayoutsArr(dividedInputArr, equalShare);
  const resultObj: resultObj = {
    total: total,
    equalShare: equalShare,
    payouts: payoutsArr,
  };
  
  res.status(200).json(resultObj);
};
