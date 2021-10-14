console.log("Hello world!");

document.body.style['background'] = '#ffffff';
document.getElementById('selectFont').remove();

let base = document.getElementsByClassName('base');
base[0].outerHTML = '<div>' + base[0].innerHTML + '</div>' 



let a = document.getElementsByTagName('a');
//console.log(a);
for (let i=a.length-1; i>0; i--){
    a[i].outerHTML = '<a href="' + a[i].href + '">' + a[i].innerText + '</a>';
}


let spans = document.getElementsByTagName('span');
for (let i=spans.length-1; i>0; i--){
    if(spans[i].innerText != ''){
        spans[i].outerHTML = '<a>' + spans[i].innerText + '</a>';
    }else{
        spans[i].remove();
    }
}


let titleBase = document.getElementsByClassName('title-base');
for (let i=0; i<titleBase.length; i++){
    titleBase[i].outerHTML = '<h1>' + titleBase[i].innerText + '</h1>';
}
titleBase = document.getElementsByClassName('title-base');
for (let i=0; i<titleBase.length; i++){
    titleBase[i].outerHTML = '<h1>' + titleBase[i].innerText + '</h1>';
}
titleBase = document.getElementsByClassName('title-base');
for (let i=0; i<titleBase.length; i++){
    titleBase[i].outerHTML = '<h1>' + titleBase[i].innerText + '</h1>';
}


let td = document.getElementsByTagName('td');
//console.log(td);
td[0].innerHTML = td[0].innerHTML.replace('<div style="background-image: url(./MessageFile/banner2020_vn.png)">', '<div background="#4ab7ff">');
td[1].outerHTML = td[1].outerHTML.replace('height="115px"', 'height="50px"');
td[td.length-8].remove();
for (let i = td.length-1; i>0; i--){
    if (td[i].innerText == ""){
        td[i].remove();
    }
}

let img = document.getElementsByTagName('img');
//console.log(img);
for (let i=img.length-1; i>0; i--){
    if (img[i].outerHTML == '<img src="App_Themes/Standard/Images/Bull9.gif" alt="">'){
        img[i].remove();
    }
}


//let tr = document.getElementsByTagName('tr');
//console.log(tr);

let mainMenu=document.getElementsByClassName('main-menu');
mainMenu[0].style['height'] = "40px"
let leftMenu = document.getElementsByClassName('left-menu');
leftMenu[0].outerHTML = mainMenu[0].outerHTML;

let table = document.getElementsByTagName('table');
console.log(table);
table[6].outerHTML = table[6].innerHTML;
table[8].outerHTML = table[8].innerHTML;
table[8].outerHTML = table[8].innerHTML;
//table[0].innerHTML = '<tbody>' + mainMenu[0].outerHTML + '</tbody>' + table[0].innerHTML;
