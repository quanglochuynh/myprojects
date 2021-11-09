let numOfCri, numOfAlt;


function btnOK() {
    setStyle('input_div','display','block');
    setStyle('input2_div','display','none');

    setStyle('result_div','display','none');
    setStyle('head_div','display','block');
    numOfCri = document.getElementById('numOfCriteriaTextBox').value;
    numOfAlt = document.getElementById('numOfAlternativeTextBox').value;
    makeCriteriaTableHTML(numOfCri);
    makeAlternativeTableHTML(numOfAlt);
}

let a = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f']
];

function makeCriteriaTableHTML(u) {
    var table = document.getElementById('criteria_table');
    table.innerHTML = '';
    var result = "<tr> ";
    result += `<th>No.</th>`;
    result += `<th>Criteria name</th>`;
    result += `<th>Weight</th>`;
    result += " </tr>";
    for(var i=0; i<u; i++) {
        result += "<tr>";
        result += `<td>` + i + `</td>`;
        let inp = `<input id="criteriaName_` + i + `" type="Text">`;
        result += `<td>`+inp+`</td>`;
        inp = `<input id="criteriaValue_` + i + `" type="number">`;
        result += `<td>` + inp + `</td>`;
        result += "</tr>";
    }
    table.innerHTML = result;
}  

function makeAlternativeTableHTML(u) {
    var table = document.getElementById('alternative_table');
    table.innerHTML = '';
    var result = "<tr> ";
    result += `<th>No.</th>`;
    result += `<th>Criteria name</th>`;
    result += " </tr>";
    for(var i=0; i<u; i++) {
        result += "<tr>";
        result += `<td>` + i + `</td>`;
        let inp = `<input id="criteriaName_` + i + `" type="Text">`;
        result += `<td>`+inp+`</td>`;
        result += "</tr>";
    }
    table.innerHTML = result;
}

function makeCompareTableHTML(u,v) {
    var table = document.getElementById('criteria_table');
    table.innerHTML = '';
    var result = "<tr> ";
    result += `<th>No.</th>`;
    result += `<th>Criteria name</th>`;
    result += `<th>Weight</th>`;
    result += " </tr>";
    for(var i=0; i<u; i++) {
        result += "<tr>";
        result += `<td>` + i + `</td>`;
        let inp = `<input id="criteriaName_` + i + `" type="Text">`;
        result += `<td>`+inp+`</td>`;
        inp = `<input id="criteriaValue_` + i + `" type="number">`;
        result += `<td>` + inp + `</td>`;
        result += "</tr>";
    }
    table.innerHTML = result;
} 


function setStyle(id, st, val){
    document.getElementById(id).style[st] = val;
}

function btnNext(){
    setStyle('head_div','display','none');
    setStyle('input1_div','display','none');
    setStyle('input2_div','display','block');
    makeCompareTableHTML(numOfAlt, numOfCri);
}

function btnNext2(){
    setStyle('result_div','display','block');
    setStyle('input_div','display','none');

}

function btnReset(){
    setStyle('input_div','display','none');
    setStyle('input1_div','display','block');
    setStyle('result_div','display','none');
    setStyle('head_div','display','block');

}