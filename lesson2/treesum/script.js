const arr = [5, 7,
  [4,[2], 8, [1,3], 2],
  [9, []],
  1, 8,
];

const treeSum = (item, sum = 0) => {
  if (Array.isArray(item)) {
    sum = item.reduce((acc, el) => {
      return Array.isArray(el) ? acc += treeSum(el, sum) : acc += el;       
    }, sum)
  } else {
    sum += item;
  }
  return sum; 
}
console.log(treeSum(arr));

// const treeSum = (item, sum = 0) => {
//   let res = sum;
//   if (Array.isArray(item)) {
//     item.forEach((el) => {
//       if (Array.isArray(el)) {
//         res +=  treeSum(el, sum);
//       } else {
//         res += el;
//       }
//     })
//   } else {
//     sum += item;
//   }
//   return sum + res;
// };
// console.log(treeSum(arr));
