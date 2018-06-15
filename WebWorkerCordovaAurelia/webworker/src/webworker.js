export class webworker{
    constructor(){

        this.singleResult='';
        this.multiResult='Done!';
        //var blob = new Blob(["self.onmessage = function(event) { postMessage(event.data); }"], {type: 'application/javascript'});  

        //importScripts("./src/worker.js");
        //this.webEmployee = new Worker(URL.createObjectURL(blob));//register worker
        this.webEmployee = new Worker("worker/worker.js")//register worker
        this.webEmployee2 = new Worker("worker/worker.js")//register worker
    }

    multiPress(){

        this.webEmployee.postMessage({ process:{ var1: "Process1"}});//send the message to the thread
        
        multiResultFont.style = "visibility: hidden";
        this.webEmployee.onmessage = function(e){
            //this.multiResult ="hello";//this doesnt work
            //console.log("done")//this works
            multiResultFont.style ="visibility: visible";
            processList.innerHTML = processList.innerHTML +"<li> Result: "+e.data.result+" </li>";
            //alert(e.data.result)//this works

        };

    }


    multiPress2(){
        this.webEmployee2.postMessage({ process:{ var1: "Process2"}});//send the message to the thread
        
        multiResultFont2.style = "visibility: hidden";
        this.webEmployee2.onmessage = function(e){
            //this.multiResult ="hello";//this doesnt work
            //console.log("done")//this works
            //alert(e.data.result)//this works
            processList.innerHTML = processList.innerHTML +"<li> Result: "+e.data.result+" </li>";
            multiResultFont2.style ="visibility: visible";
            

        };

    }

    


    singlePress(){
      this.singleResult = '';
        //alert("hello");
        let test = this.multiResult;
        for(let i =0; i< 2000000000; i+=.5){

        }
        this.singleResult ='Done!'
        processList.innerHTML = processList.innerHTML + "<li> single thread finished </li>";
    }





}
