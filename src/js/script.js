let numbers = document.querySelectorAll('.numbers');
let sing = document.querySelectorAll('.sing');
let result = document.querySelector('.result');
let topResult = document.querySelector('.top-result');
let histoyResult = document.querySelector('.histoy-result');
let cleanAll = document.querySelector('.cleanAll');
let clean = document.querySelector('.clean');
let equal = document.querySelector('.equal');
let mood = document.querySelector('.mood');
let dark = document.querySelector('.dark');
let light = document.querySelector('.light');
let lightBg = document.querySelector('.light-bg');
let darkMood = document.querySelectorAll('.dark-mood');
let darkBg = document.querySelector('.dark-bg');
let allHistory = '';
let myHistory = ''; //بالایی
let numberResult = '';// پایینی
let nextLevel = false;
let fontMood = 'dark';


function grayColor(result){
    result.style.color = 'gray';
    result.style.fontSize = '28pt';
    result.style.paddingTop = '5px';
    result.style.paddingRight = '5px';
    result.style.transition = '0s';
}
function blackColor(result){
    if (fontMood === 'dark'){
        result.style.color = 'black';
    }else{
        result.style.color = 'white';
    }
    result.style.fontSize = '50pt';
    result.style.paddingTop = '0px';
    result.style.transition = '0s';
    if (result.innerHTML.length >= 10){
        result.style.fontSize = '40pt';
    }
}

function calculator (enterSing,firstNum,secNum){
    if (enterSing === '+' || enterSing === false){
        return showResult = Number(firstNum) + Number(secNum);
    }else if (enterSing === '-'){
        return showResult = Number(firstNum) - Number(secNum);
    }else if (enterSing === '*'){
        return showResult = Number(firstNum) * Number(secNum);
    }else if (enterSing === '/'){
        return showResult = Number(firstNum) / Number(secNum);
    }else{
        alert('ERROR')
    }
}

numbers.forEach(function(num) {
    num.addEventListener('click',function(){
        if (nextLevel === true){
            nextLevel = false;
            if (numberResult !=''){
                allHistory+=`${myHistory}=${numberResult}<br/>`;
                histoyResult.innerHTML = allHistory;
            }
            myHistory = '';
            numberResult = '';
        }
        firstBox =''
        secBox = ''
        nowSing = ''

        if (myHistory === '' && num.textContent==='0' || myHistory === '0' && num.textContent==='0'){
            myHistory = num.textContent;
            numberResult =num.textContent;
            return;
        }else if (myHistory.slice(-1) === '0' && ['+', '-', '*', '/'].includes(myHistory.slice(-2,-1))){
            return;
        }else{
            if (myHistory.length >= 13){
                return;
            }
            myHistory += num.textContent;
        }
        myHistory.split('').map(function(checkNumbers) {
            if(['+', '-','*','/'].includes(checkNumbers)){
                if (secBox != ''){
                    firstBox = calculator (nowSing,firstBox,secBox)
                    secBox = ''
                    nowSing = checkNumbers;
                }else{
                    nowSing = checkNumbers;
                }
            }else{
                if (nowSing != ''){
                    secBox +=checkNumbers;
                }else{
                    firstBox +=checkNumbers;
                }
            }
        })
        if (secBox != ''){
            numberResult = calculator (nowSing,firstBox,secBox)
        }else{
            numberResult = firstBox;
        }
        result.innerHTML = '= '+numberResult;
        grayColor(result);
        blackColor(topResult);
        topResult.innerHTML = myHistory;
    })
});
sing.forEach(function(entrSing) {
    entrSing.addEventListener('click',function(){
        if (nextLevel === true){
            nextLevel = false;
            if (numberResult !=''){
                allHistory+=`${myHistory}=${numberResult}<br/>`;
                histoyResult.innerHTML = allHistory;
            }
            myHistory = `${numberResult}${entrSing.textContent}`;
            topResult.innerHTML = myHistory;
            blackColor(topResult)
            result.innerHTML ='= '+numberResult;
            grayColor(result);
        }else if (myHistory != '' ){
            if(['+', '-', '*', '/'].includes(myHistory.slice(-1))){
                myHistory = myHistory.slice(0,-1);
                showHistory = `${myHistory}${entrSing.textContent}`
                myHistory += entrSing.textContent;
            }else{
                showHistory = `${myHistory}${entrSing.textContent}`
                myHistory += entrSing.textContent;
            }
            topResult.innerHTML = showHistory;
        }
    })
});
cleanAll.addEventListener('click',function(){
    if (myHistory === '' && numberResult === '' && allHistory !=''){
        allHistory = ''
        histoyResult.innerHTML = '';
    }else{
        myHistory = '';
        numberResult = '';
        blackColor(result)
        result.innerHTML = 0;
        topResult.innerHTML = '';
    }
})
clean.addEventListener('click',function(){
    if (numberResult != '' && nextLevel === false){
        if (myHistory.length >1){
            myHistory = myHistory.slice(0,-1);
            if (myHistory.length <= 10){
                topResult.style.fontSize = '50pt';
            }
            firstBox =''
            secBox = ''
            nowSing = ''
            lasrPart = ''
            myHistory.split('').map(function(checkNumbers) {
                if(['+', '-', '*', '/'].includes(checkNumbers)){
                    if (secBox != ''){
                        firstBox = calculator (nowSing,firstBox,secBox)
                        secBox = ''
                        nowSing = checkNumbers
                    }else{
                        nowSing = checkNumbers
                    }
                }else{
                    if (nowSing != ''){
                        secBox +=checkNumbers
                    }else{
                        firstBox +=checkNumbers
                    }
                }
                lasrPart = checkNumbers;
            })
            topResult.innerHTML = myHistory;
            if (secBox != ''){
                numberResult = calculator (nowSing,firstBox,secBox)
            }else{
                numberResult = firstBox
            }
            result.innerHTML = '= '+numberResult;
            grayColor(result);
        }else if(myHistory.length >0){
            myHistory = '';
            numberResult = '';
            blackColor(result)
            result.innerHTML = 0;
            topResult.innerHTML = '';
        }
    }
})
equal.addEventListener('click',function(){
    if (numberResult !== '' && nextLevel === false){
        nextLevel = true;
        grayColor(topResult)
        topResult.innerHTML = myHistory;
        blackColor(result)
        result.innerHTML ='='+numberResult;
        result.style.transition = '0.3s';
        topResult.style.transition = '0.3s';
    }
})
mood.addEventListener('click',function(){
    if (fontMood === 'dark'){
        fontMood = 'white';
        light.style.bottom = '9px';
        dark.style.bottom = '-59px';
        dark.style.transition = '0.3s';
        light.style.transition = '0.3s';
        lightBg.className = 'calculator dark-bg';
        darkMood.forEach(function(button) {
            button.classList.remove('dark-mood');
            button.classList.add('light-mood');
        });
        if (nextLevel === true || allHistory === '' && numberResult === '' && allHistory === ''){
            result.style.color = 'white';
        }else{
            topResult.style.color = 'white';
        }
    }else{
        fontMood = 'dark';
        light.style.bottom = '59px';
        dark.style.bottom = '9px';
        dark.style.transition = '0.3s';
        light.style.transition = '0.3s';
        lightBg.className = 'calculator light-bg';
        darkMood.forEach(function(button) {
            button.classList.remove('light-mood');
            button.classList.add('dark-mood');
        });
        if (nextLevel === true || allHistory === '' && numberResult === '' && allHistory === ''){
            result.style.color = 'black';
        }else{
            topResult.style.color = 'black';
        }
    }
})
document.addEventListener('keydown',function(event){
    if (['+', '-', '*', '/'].includes(event.key)){
        if (nextLevel === true){
            nextLevel = false;
            if (numberResult !=''){
                allHistory+=`${myHistory}=${numberResult}<br/>`;
                histoyResult.innerHTML = allHistory;
            }
            myHistory = `${numberResult}${event.key}`;
            topResult.innerHTML = myHistory;
            blackColor(topResult)
            result.innerHTML ='= '+numberResult;
            grayColor(result);5
        }else if (myHistory != '' ){
            if(['+', '-', '*', '/'].includes(myHistory.slice(-1))){
                myHistory = myHistory.slice(0,-1);
                showHistory = `${myHistory}${event.key}`
                myHistory += event.key;
            }else{
                showHistory = `${myHistory}${event.key}`
                myHistory += event.key;
            }
            topResult.innerHTML = showHistory;
        }
    }else if (['0','1','2','3','4','5','6','7','8','9','.'].includes(event.key)){
        if (nextLevel === true){
            nextLevel = false;
            if (numberResult !=''){
                allHistory+=`${myHistory}=${numberResult}<br/>`;
                histoyResult.innerHTML = allHistory;
            }
            myHistory = '';
            numberResult = '';
        }
        firstBox =''
        secBox = ''
        nowSing = ''

        if (myHistory === '' && event.key==='0' || myHistory === '0' && event.key==='0'){
            myHistory = event.key;
            numberResult =event.key;
            return;
        }else if (myHistory.slice(-1) === '0' && ['+', '-', '*', '/'].includes(myHistory.slice(-2,-1))){
            return;
        }else{
            if (myHistory.length >= 13){
                return;
            }
            myHistory += event.key;
        }
        myHistory.split('').map(function(checkNumbers) {
            if(['+', '-','*','/'].includes(checkNumbers)){
                if (secBox != ''){
                    firstBox = calculator (nowSing,firstBox,secBox)
                    secBox = ''
                    nowSing = checkNumbers;
                }else{
                    nowSing = checkNumbers;
                }
            }else{
                if (nowSing != ''){
                    secBox +=checkNumbers;
                }else{
                    firstBox +=checkNumbers;
                }
            }
        })
        if (secBox != ''){
            numberResult = calculator (nowSing,firstBox,secBox)
        }else{
            numberResult = firstBox;
        }
        result.innerHTML = '= '+numberResult;
        grayColor(result);
        blackColor(topResult);
        topResult.innerHTML = myHistory;
    }else if (event.key =='Backspace'){
        if (numberResult != '' && nextLevel === false){
            if (myHistory.length >1){
                myHistory = myHistory.slice(0,-1);
                if (myHistory.length <= 10){
                    topResult.style.fontSize = '50pt';
                }
                firstBox =''
                secBox = ''
                nowSing = ''
                lasrPart = ''
                myHistory.split('').map(function(checkNumbers) {
                    if(['+', '-', '*', '/'].includes(checkNumbers)){
                        if (secBox != ''){
                            firstBox = calculator (nowSing,firstBox,secBox)
                            secBox = ''
                            nowSing = checkNumbers
                        }else{
                            nowSing = checkNumbers
                        }
                    }else{
                        if (nowSing != ''){
                            secBox +=checkNumbers
                        }else{
                            firstBox +=checkNumbers
                        }
                    }
                    lasrPart = checkNumbers;
                })
                topResult.innerHTML = myHistory;
                if (secBox != ''){
                    numberResult = calculator (nowSing,firstBox,secBox)
                }else{
                    numberResult = firstBox
                }
                result.innerHTML = '= '+numberResult;
                grayColor(result);
            }else if(myHistory.length >0){
                myHistory = '';
                numberResult = '';
                blackColor(result)
                result.innerHTML = 0;
                topResult.innerHTML = '';
            }
        }
    }else if (event.key =='Enter'){
        if (numberResult !== '' && nextLevel === false){
            nextLevel = true;
            grayColor(topResult)
            topResult.innerHTML = myHistory;
            blackColor(result)
            result.innerHTML ='='+numberResult;
            result.style.transition = '0.3s';
            topResult.style.transition = '0.3s';
        }
    }
})