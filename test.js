let 兔 = 0;   // 假设兔子0
let 鸡 = 35; // 假设鸡35

const 题中脚的总数 = 94;  // 题中的脚  不变量

do {
  兔++;
  鸡--;
} while ((兔*4+鸡*2)<题中脚的总数);

if((兔*4+鸡*2) ==题中脚的总数){
  console.log(`鸡一共${鸡}只，兔一共${兔}只`)
}else{
  console.log('此题无解')
}