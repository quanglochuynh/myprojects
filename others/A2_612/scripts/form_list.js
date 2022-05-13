formArray = []

function setup(){
    initFormArray()
    feedForm()
}

function initFormArray(){
    formArray.push(new MainForm(3,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "1"));
    formArray.push(new MainForm(1,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2610", "1"));
    formArray.push(new MainForm(0,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu anus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "8"));
    formArray.push(new MainForm(5,4,"Lorem ipsum dolor sit amet Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2602", "4"));
    formArray.push(new MainForm(2,4,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maxsuscipit ligula sit amet tempor laoreet.","A2612", "1"));
}

function feedForm(){
    container = document.getElementById("scroll_view")
    str = ""
    for (let i=0; i<formArray.length; i++){
        
    }

}

