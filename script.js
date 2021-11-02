var bid = document.querySelector('#bid');
var edu = document.querySelector('#education');
var networth = document.querySelector('#networth');
var caste = document.querySelector('#caste');
var skills = document.querySelectorAll('#skills');
var age = document.querySelectorAll('#age');
var rep = document.querySelectorAll('#rep');
var total = document.querySelector('#total');
var loveLetter = document.querySelector('#love_letter');
var brideName = document.querySelector('#name');


const eduValue=() =>{
    if(edu.value!=="") {
        return edu.value;
    }
    else {
        return 1;
    }

}
const networthValue=() =>{
    if(networth.value!=="") {
        return networth.value;
    }
    else {
        return 1;
    }
}
const casteValue=() =>{
    if(caste.value!=="") {
        return parseInt(caste.value);
    }
    else {
        return 0;
    }
}
const ageValue =()=>{
    let a=1;
    age.forEach(item=>{
        if(item.checked) {
            switch(item.value) {
                case '1': 
                    a*=1.5; 
                break;
                case '2':
                    a*=1.2;
                break;
                case '3':
                    a*=0.95;
                break;
                default: 
                    return 1;
            }
        }
    });
    return a;
}
const repValue =()=>{
    let a=1;
    let b=0; 
    rep.forEach(item=> {
        if(item.checked) {
            switch(item.value) {
                case '1': 
                    a*=0.85; 
                break;
                case '2': 
                    a*=0.9; 
                break;
                case '3': 
                    b-=20; 
                break;
                default: 
                    return [a, b];
            }
        }
    })
    return [a, b];
}

let totalPrice=0; 
let initialBid=bid.value;

document.addEventListener('DOMContentLoaded',()=> {
    calculate(initialBid);
});
bid.addEventListener('keyup', ()=> {
    initialBid=bid.value;
});
document.addEventListener('change',()=> {
    calculate(initialBid);
});

const inputFields=[brideName, loveLetter];
inputFields.forEach(input => {
    input.addEventListener('keyup', ()=> {
        calculate(initialBid);
    });
});

const getCheckboxValuesFilterReduce = (html_collection) => {
    let list = Array.from(html_collection).filter(filteration);
    let result = list.reduce(reducer,0);
    return result;
}
const reducer = (accumulator, item) => {
    return accumulator + Number(item.value)
};
const filteration = (item) => {
    return item.checked;
}

const calculate=(price) => {
    if(price && brideName!=='') {
        let bride={
            name: brideName.value,
            bride_price: price,
            letter: loveLetter.value
        };
        totalPrice=bride.bride_price*eduValue()*networthValue()*repValue()[0]*ageValue()+casteValue()+getCheckboxValuesFilterReduce(skills)+repValue()[1]; 
        bride.bride_price=totalPrice;
        result(bride.name,bride.bride_price,bride.letter);
        
    }
    else 
        result('','','');
}
const result=(name, price, letter) => {
    if(name || price || letter!=='')
        total.innerHTML=`Your price for ${name} is ${price}$. ${letter}`;
    else 
        total.innerHTML='';
}