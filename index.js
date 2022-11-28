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
  console.log('DP: ', DP);
  const resArr = [];
  let i = originList.length - 1, j = targetList.length - 1;
  while(DP[i][j] > 0) {
    if (originList[i] === targetList[j]) {
      resArr.push(originList[i]);
      i--; j--;
    };
    if (i <= 0 || j <= 0) break;
    else if (DP[i - 1][j] >= DP[i][j - 1]) i--;
    else j--;
  }
  return resArr.reverse();
}
console.log(getLCS(['A', 'B', 'C', 'B', 'D', 'A', 'B'], ['B', 'D', 'C', 'A', 'B', 'A']));