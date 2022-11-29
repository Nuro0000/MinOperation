function LCS_DP(originList, targetList) {
  const len1 = originList.length, len2 = targetList.length;
  const dp = new Array(len1).fill(0).map(v => new Array(len2).fill(0));
  if (originList[0] === targetList[0]) dp[0][0] = 1;
  for (let i = 1; i < len1; i++) {
      dp[i][0] = originList[i] === targetList[0] ? 1 : dp[i - 1][0];
  }
  for (let j = 1; j < len2; j++) {
      dp[0][j] = originList[0] === targetList[j] ? 1 : dp[0][j - 1];
  }

  for (let i = 1; i < len1; i++) {
      for (let j = 1; j < len2; j++) {
          dp[i][j] = originList[i] === targetList[j] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
  }
  return dp;
}

function getLCS(originList, targetList) {
  const DP = LCS_DP(originList, targetList);
  const resArr = [];
  let i = originList.length - 1, j = targetList.length - 1;
  while(DP[i][j] > 0) {
    if (originList[i] === targetList[j]) {
      resArr.unshift(targetList[j]);
      i--; j--;
      if (i < 0 || j < 0) break;
    } else if (i === 0) {
      j--;
    } else if (j === 0) {
      i--;
    } else {
      if (DP[i - 1][j] >= DP[i][j - 1]) i--;
      else j--;
    }
  }
  return resArr;
}

/* 
  * operation:[{ del: item },{ add: item },{ sort: { from : item1, to: item2 } }]
*/

function minOperation(originList, targetList) {
  const delList = originList.filter(v => !targetList.includes(v));
  const appendList = targetList.filter(v => !originList.includes(v));

  const operation = [];

  operation.push(...delList.map(v => ({ del: v })));
  operation.push(...appendList.map(v => ({ add: v })));

  const beforeSortList = originList.filter(v => !delList.includes(v)).concat(appendList);

  const LCS = getLCS(beforeSortList, targetList);
  
  operation.push(...sortOperation(targetList, LCS));

  return operation;
}

function sortOperation(targetList, LCS) {
  const operation = []
  for (let i = 0, len = targetList.length; i < len; i++) {
    if (!LCS.includes(targetList[i])) {
      operation.push({ sort: { from: targetList[i], to: i > 0 ? targetList[i - 1] : null } });
    }
  }
  return operation;
}

console.log(minOperation(['1', '2', '3', '4', '5', '6', '7'], ['3', '5', '4', '6', '7', '9']));