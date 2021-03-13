function sum(a,b){
    return a+b;
};
function multiply(a,b){
    console.log("triggered");
    return a*b;
};
function division(a,b){
    if(b===0)
    return -1;
    else
    return a/b;
};
function subtraction(a,b){
    return a-b;
};
function isNum(n){
    let parsed = parseInt(n);
    if(isNaN(parsed))
    return false;
    else
    return true;
}
function isEmpty(s){
    return s.length>0;
}
function operation(n){
    if(output>0 && num===0 && !opchecker(operator)){
        if(isdecimal === 1){
            output = output + parseInt(n.trim())*(10**(decimalpower--));
            outputy.textContent = output;
        }
        else{
            output = output*10 + parseInt(n.trim());
            outputy.textContent = output;
        }
        return;
    }
    if(isdecimal === 1){
        num += parseInt(n)*(10**decimalpower);
        decimalpower--;
        outputy.textContent = num;
    }
    else{
        num = num*10 + parseInt(n);
        outputy.textContent = num;
    }
}
function opchecker(n){
    if(n=== '*' || n=== '/' || n=== '-' || n=== '+')
    return true;
    else
    return false;
}
function ifInteger(n){
    return Math.floor(n)===n;
}
function mathem(o,n,op){
    if(n===0 && operator==='/'){
    outputy.textContent = "Error!,Division by Zero";
    historia.textContent = '';
    return -1;
    }
    switch(op){
        case '*':output = multiply(o,n);break;
        case '/':output = division(o,n);break;
        case '+':output = sum(o,n);break;
        case '-':output = subtraction(o,n);break;
    }
    num = 0;
    operator = '';
    isdecimal = 0;
    if(ifInteger(output)){
        outputy.textContent = output;
        historia.textContent = output;
    }
    else{
    outputy.textContent = output.toFixed(1);
    historia.textContent = output.toFixed(1);
    }
    console.log(historia.textContent.length + " " + outputy.textContent.length);
}
function checker(n){
    if(isNum(n)){
        operation(n);
    }
    else if(n.trim() === '.'){
        isdecimal = 1;
        decimalpower = -1;
        output.textContent += num;
    }
    else{
        if(opchecker(n.trim())){
            if(isdecimal === 1){
                isdecimal = 0;
                decimalpower = -1;
            }
            if(j===0){
                output = num;
                num = 0;
                j = 1;
                operator = n.trim();
            }
            else if(num===0){
                mathem(output,num,operator);
                operator = n.trim();
            }
            else if(num>0){
                mathem(output,num,operator);
                operator = n.trim();
            }
        }
    }
    historia.textContent += n.trim();
}
function onEnter(e){
    if(isNaN(output) || isNaN(num) || !opchecker(operator)){
        return -1;
    }
    else{
        mathem(output,num,operator);
    }
}
function onClear(e){
    output = 0;
    num = 0;
    isdecimal = 0;
    j = 0;
    decimalpower = 0;
    operator = '';
    outputy.textContent = '';
    historia.textContent = '';
}
function lastElement(s){
    return s.charAt(s.length-1).trim();
}
function Apply(e){
    checker(e.target.textContent);
}
function onBackspace(e){
    historia.textContent = historia.textContent.trim();
    if(!isEmpty(historia.textContent))
    return;
    if(opchecker(lastElement(historia.textContent))){
        console.log("hello");
        operator = '';
        historia.textContent = historia.textContent.slice(0,-1);
        return;
    }
    if(isdecimal===1){
        if(num>0){
            num = parseInt(outputy.textContent.slice(0,-1));
            outputy.textContent = num;
            historia.textContent = historia.textContent.slice(0,-1);
            isdecimal = 0;
            historia.textContent = historia.textContent.slice(0,-1);
        }
    }
    else if(num>0){
        num = Math.floor(num/10);
        outputy.textContent = num;
        historia.textContent = historia.textContent.slice(0,-1);
    }
    else if(output>0){
        if(ifInteger(output)){
            output = Math.floor(output/10);
            outputy.textContent = output;
            historia.textContent = output;
        }
        else{
            output = parseInt(outputy.textContent.slice(0,-1));
            outputy.textContent = output;
            historia.textContent = historia.textContent.slice(0,-2);
        }
    }
    console.log(parseInt(outputy.textContent.trim()===0));
    if((num===0 && j===0) || output===0 && j===1){
        onClear(e);
    }
}
function selector(e){
    if(isNum(e.key) || opchecker(e.key.trim()) || e.key.trim() === '.'){
        console.log(e.key);
        checker(e.key.trim());
    }
    else if(e.key==='Enter')
    onEnter(e);
    else if(e.key==='Backspace')
    onBackspace(e);
}
let output = 0;
let num = 0;
let j = 0;
let isdecimal = 0;
let decimalpower = -1;
let operator;
let bindable = [49,50,51,52,53,54,55,56,57,61,173,190,191];
const historia = document.querySelector('.history');
const outputy = document.querySelector('.output');
const equalto = document.querySelector('#equal');
const clbutton = document.querySelector('#clear');
let btn = document.querySelectorAll('#num');
clbutton.addEventListener('click',onClear);
equalto.addEventListener('click',onEnter);
btn.forEach((ele) => ele.addEventListener('click',Apply));
const bspace = document.querySelector('#bspace');
bspace.addEventListener('click',onBackspace);
window.addEventListener('keydown',selector);