let sortArrRandomly = (arr) => {
  let len = arr.length - 1;

  if(len > 0 && Array.isArray(arr)){

      for(let i=len ; i > 0 ; i--){
          let rnd = Math.floor(Math.random() * i);
          swap(arr, i, rnd);
      }
  }

  return arr;
};

let swap = (arr, idx1, idx2) => {
  let tmp = arr[idx1];

  arr[idx1] = arr[idx2];
  arr[idx2] = tmp;
};

let duplicateArr = (arr) => arr.concat(arr);

let addImgResources = (urls, timeout) => {
    let promises = [];

    for(let item of urls){
        promises.push(addResourceIfValid(item, timeout));
    }

    return Promise.all(promises);
};

let addResourceIfValid = (url, timeout) => {
    return new Promise((res, rej) => {
        let time = timeout || 2000;
        let img = new Image();
        let timer = setTimeout(() => {
            img.src = '';
            rej("Timeout");
        }, time);

        img.src = url;

        img.onerror = () => {
            clearTimeout(timer);
            rej("Resource is unreachable");
        };

        img.onload = () => {
            clearTimeout(timer);
            res(url);
        };
    });
};

export {addImgResources, duplicateArr, sortArrRandomly};