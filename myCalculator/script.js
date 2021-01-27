function getHistory(){
    return document.getElementById("history-value").innerHTML;
}

function printHistory(num){
    document.getElementById("history-value").innerHTML = num;
}

function getOutput(){
    return document.getElementById("output-value").innerHTML;
}

function printOutput(num){
    document.getElementById("output-value").innerHTML = num;
}

var numbers = document.getElementsByClassName("number");
for(let i = 0 ; i < numbers.length ; i++){
    numbers[i].addEventListener("click" , function(){
        if(getOutput() == ""){
            printOutput(this.id);
        }
        else{
            printOutput(getOutput() + this.id);
        }
    })
}
function clear(){
    printHistory("");
    printOutput("");
}

var operators = document.getElementsByClassName("operator");
for(let i = 0 ; i < operators.length ; i++){
    if(i == 0){
        operators[i].addEventListener("click" , clear)
    }
    else if(i == 1){
        operators[i].addEventListener("click" , function(){
            let output = getOutput();
            if(output == ""){
            }else{
            output = output.substr(0,output.length - 1);}

            printOutput(output);
        })
    }
    else{
        operators[i].addEventListener("click" , function(){
        let output=getOutput();
        let history=getHistory();

        if(output == ""  &&  history == ""){
            clear();
        }
        
		else if(output == ""  &&  history != ""){
			if(isNaN(history[history.length-1])){
                if(this.id == "="){
                    history = history.substr(0,history.length-1);
                    output = eval(history);
                    printOutput(output);
                    printHistory("");
                }
                else{
                history = history.substr(0,history.length-1);
                history += this.id;
                printHistory(history);
                printOutput("");
                }
                
            }
            
            else{
            history += this.id;
            printHistory(history);
            printOutput("");
            }
        }

        else if(output != "" && history != ""){
            if(this.id == "="){
                history += output;
                output = eval(history);
                printOutput(output);
                printHistory("");
            }
            else{
                history += output + this.id;
                printHistory(history);
                printOutput("");
            }
        }
        else{
            if(this.id == "="){
                printOutput(output);
                printHistory("");
            }
            else{
                history = getOutput();
                history += this.id;
                printHistory(history);
                printOutput("");
            }
        }
        
        
           
        
        }) 

    }
    
}
