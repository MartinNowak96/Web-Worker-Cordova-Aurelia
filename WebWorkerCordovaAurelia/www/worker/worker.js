
this.onmessage = function(e){
    if(e.data.process != undefined){//if the request was to doMath
        for(let i =0; i< 2000000000; i+=.5){

        }
        
        //let result = {result: e.data.doMath.num1 + e.data.doMath.num2};
        let result ={result: e.data.process.var1 + " Done"}
        this.postMessage(result);//send message back with answer in e.data.result
    }

}