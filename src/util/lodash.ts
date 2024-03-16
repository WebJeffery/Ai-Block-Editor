
// @ts-nocheck
export const groupBy = (arr, keyOrFunc) => {
    const map = {}
    if(typeof keyOrFunc==='string') {
      arr.forEach(item=>{
        const key = item[keyOrFunc];
        if(!map[key]){
          map[key] = []
        }
        map[key].push(item)
      })
    }else{
      arr.forEach(item=>{
        const key = keyOrFunc(item)
        if(!map[key]){
          map[key] = []
        }
        map[key].push(item)
      })
    }
    return map;
  }

