const buttons = document.querySelectorAll(".buttons");
const display = document.querySelector(".display-screen");
document.querySelector(".multiply").addEventListener("click", ()=>chooseOperator("*"));
document.querySelector(".add").addEventListener("click", ()=>chooseOperator("+"));
document.querySelector(".subtract").addEventListener("click", ()=>chooseOperator("-"));
document.querySelector(".divide").addEventListener("click", ()=>chooseOperator("/"));
document.querySelector(".permute").addEventListener('click',()=>chooseOperator("P"));
document.querySelector(".combine").addEventListener('click',()=>chooseOperator("C"));
document.querySelector(".equals").addEventListener("click", ()=>calculate());
document.querySelector(".clear").addEventListener("click", ()=>clear());
document.querySelector(".factorial").addEventListener("click", ()=>chooseOperator("!"));


let currNum = "0";
let prevNum = "";
let operator = "";
let result = "";

let appendNum = (num) =>{
    if(result !== "" || (num === "." && currNum.includes("."))) return;
    //Calculating factorial doesn't require two numbers
    if(operator === "!") return;
    if (currNum === "0"){
        currNum = num
    }else{
        currNum += num;
    }
    displayNum();
}

let chooseOperator = (sign) =>{
    if (currNum === "") return;
    if (prevNum !== "") {
        calculate();
    }
    operator = sign;
    console.log(operator,"currNum has been switched to prevNum.");
    prevNum = currNum;
    currNum = "";
    result = "";
}
let factorial = (num) =>{
    let fact = 1;
    console.log("This is the factorial portion.");
    for (let i = 1; i <=num ; i++){
        fact = fact * i ;
    }
    return fact;
}

let calculate = () =>{
    console.log("The previous number is:", prevNum);
    console.log("The current number is:", currNum);

    //Lets say a user enters 1 and then presses equals
    //This condition checks that there must be operator to run the calculate command
    if (operator !== ""){
        //This statement is for factorial operation.
        if (operator === "!"){
            result = factorial(prevNum);  
        }
        else{
            //Lets say a user enters "1" and "+"  and clicks "=" equals for calculation
            //Since the for + operator 2 numbers are required the above statement isnot logical
            //The if statement below checks whether both number are present or not (if not present the function doesn't run).
            if (currNum === "") return;
            let num1 = parseFloat(prevNum);
            let num2 = parseFloat(currNum);
            
            //This statement is for , if a user enters a number and then presses equal 
            if (operator === "+"){
                result = (num1 + num2);    
            }else if (operator === "-"){
                result = (num1 - num2); 
            }else if (operator === '*'){
                result = (num1 * num2); 
            }else if (operator ==="/"){
                if(num2 !== 0){
                    result = (num1 / num2); 
                }else{
                    result = "Cannot divide by Zero"
                }
                
            }
            //For Permutation and Combination
            else{
                if(num1 >= num2){
                    let n = num1;
                    let r = num2;
                    if (operator === "P"){
                        result = factorial(n)/factorial(n-r);
                    }
                    else{
                        result = factorial(n)/(factorial(r)*factorial(n-r)); 
                    } 
                }
                else{
                    result = "--Math Error--";
                }
                
            }
        }
        //Assigning result to currNum 
        //With this we can perform chaining calculation. 
        currNum = result;
        console.log(currNum,"The result has been shifted to currNum.")
        prevNum = "";
        operator = "";
        displayNum();     
    }else{
        return;
    } 
}

let clear = () =>{
    currNum = "0";
    prevNum = "";
    operator = "";
    result = "";
    displayNum();
}

let displayNum = () =>{
    display.innerText = currNum;
}

buttons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        if(e.target.innerText != "AC" && e.target.innerText != "nPr" &&e.target.innerText != "nCr" && e.target.innerText != "=" && e.target.innerText != "!" && e.target.innerText != "X" && e.target.innerText != "+" && e.target.innerText != "-" && e.target.innerText != "/"){
            appendNum(e.target.innerText);           
        }
    })
})


// For Dark Mode and Light mode
const darkMode = document.querySelector("#Dmode");
const LightMode = document.querySelector("#Lmode");
const body = document.querySelector("body");
;

LightMode.addEventListener("click",()=>{
    body.style.backgroundColor = "white"; 
    buttons.forEach((button)=>{
        button.classList.add("buttonsL");
    })
    document.querySelector(".button-container").style.backgroundColor = "white";
    document.querySelector(".display-screen").style.backgroundColor = "#F5F5F5";
    document.querySelector(".display-screen").style.color = "black";
    document.querySelector(".author-container").style.color="black";

})

darkMode.addEventListener("click",()=>{
    body.style.backgroundColor = "#1E1E1E";
    buttons.forEach((button)=>{
        button.classList.remove("buttonsL");
    })
    document.querySelector(".button-container").style.backgroundColor = "#2B2B2B";
    document.querySelector(".display-screen").style.backgroundColor = "#1E1E1E";
    document.querySelector(".display-screen").style.color = "white";
    document.querySelector(".author-container").style.color="white";

})

