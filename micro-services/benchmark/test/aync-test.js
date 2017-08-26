function asyncSleep(time){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{resolve('ok');},time);
    });
}

async function start(){
    let res = await asyncSleep();
    console.log(res);
}

console.log('start...');
start();