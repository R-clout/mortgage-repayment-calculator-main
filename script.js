const clearButton = document.getElementById("clearbutton");
const amount = document.getElementById("amount");
const term = document.getElementById("years");
const rate = document.getElementById("interest");
const radios = document.getElementsByName("mortgage");
const repayBtn = document.getElementById("calculateRepayment");
const resultPanel = document.getElementById("result-panel");
const amountError = document.getElementById('amount-error');
const termError = document.getElementById("term-error");
const rateError = document.getElementById("rate-error");
const typeError = document.getElementById("type-error");
const result = document.getElementById("result");
const monthlyRepay = document.getElementById("repayMonthly");
const termRepay = document.getElementById("termRepay");


const unselected = amount.value == "" || term.value == "" || rate.value == "";

    let selected = valueSelect();



repayBtn.addEventListener("click", (event) => {
    event.preventDefault();
   let selected = valueSelect();
    validateInput(amount, amountError);
validateInput(term, termError);
validateInput(rate, rateError);


    
    if(selected == null){
        typeError.innerText = "This field is required";
    } else {
    typeError.innerText = "";
    }

    if(selected == "repayment"){
        resultPanel.classList.add("hidden");
        result.classList.remove("hidden");
        monthlyRepay.innerText = `€${formatNumberWithCommas(mortgage())}`;
        termRepay.innerText =  `€${formatNumberWithCommas(totalRepayment())}`;
       }else if(selected == "interestOnly"){
        resultPanel.classList.add("hidden");
        result.classList.remove("hidden");
        monthlyRepay.innerText = `€${formatNumberWithCommas(interestTerm())}`;
        termRepay.innerText = `€${formatNumberWithCommas(interestRepay())}`;
       } else if(selected == null){
        console.log("empty")
}
})


function validateInput(input, errorElement) {
    const sibling = input.previousElementSibling;
    if (!input.validity.valid) {
        errorElement.innerText = "This field is required";
        sibling.style.backgroundColor = "hsl(4, 69%, 50%)";
        input.style.borderColor = "hsl(4, 69%, 50%)";
        sibling.style.color = "hsl(0, 0%, 100%)";
    } else {
        errorElement.innerText = "";
        sibling.style.removeProperty("background-color");
        input.style.removeProperty("border-color");
        sibling.style.removeProperty("color");
    }
}


function valueSelect(){
    let selectedValue = null;
    for(const radio of radios){
        if(radio.checked){
            selectedValue = radio.value;
            break;
        } 
    }
    return selectedValue;
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, ",");
}

 // Output: 1,234,567,890

//Monthly payment for interest only = interest rate% * loan amount / 12;

const interestTerm = () => {
    let amountValue = amount.value;
    let rateValue = rate.value;

    let P = Number(amountValue);
    let r = (Number(rateValue) / 100);

    let total = (P * r) / 12;
    return total.toFixed(2);
}

console.log(interestTerm());
 
const interestRepay = () => {
    let termValue = term.value;
    
    let n = Number(termValue) * 12;

   let total = n * interestTerm();

    return total.toFixed(2);
}



const mortgage = () => {
    let amountValue = amount.value;
    let termValue = term.value;
    let rateValue = rate.value;
    
    let P = Number(amountValue);
    let n = Number(termValue) * 12;
    let r = (Number(rateValue) / 100) / 12;

    let numerator = r * Math.pow(1 + r, n);
    let denominator = Math.pow(1 + r, n) - 1;

    let total = P * ((numerator) / (denominator));
    return total.toFixed(2);
}

const totalRepayment = () => {
    let termValue = term.value;

    let n = Number(termValue) * 12;

    let total = mortgage() * n;
    return total.toFixed(2);
}

clearButton.addEventListener("click", () => {
   amount.value = "";
   term.value = "";
   rate.value = "";
   valueSelect() = "";
})




