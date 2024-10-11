const clearButton = document.getElementById("clearbutton");
const amount = document.getElementById("amount");
const term = document.getElementById("years");
const rate = document.getElementById("interest");
const radios = document.getElementsByName("mortgage");
const repayBtn = document.getElementById("calculateRepayment");
const resultPanel = document.getElementById("result-panel");
const result = document.getElementById("result");
const monthlyRepay = document.getElementById("repayMonthly");
const termRepay = document.getElementById("termRepay");


const unselected = amount.value == "" || term.value == "" || rate.value == "" || valueSelect() == null;


repayBtn.addEventListener("click", () => {
    let selected = valueSelect();
    if(selected == "repayment"){
       resultPanel.classList.add("hidden");
       result.classList.remove("hidden");
       monthlyRepay.innerText = `€${formatNumberWithCommas(mortgage())}`;
       termRepay.innerText = `€${formatNumberWithCommas(totalRepayment())}`;
    } else if(unselected){
        console.log('This is clean');
    } else {
        console.log("Hello world")
    }
})

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

console.log(formatNumberWithCommas(1234567890)); // Output: 1,234,567,890


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
    console.log("Hello world")
})





