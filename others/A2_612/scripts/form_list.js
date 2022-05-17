arrayVanDe = []
arrayVanDe.push(new VanDe(0, "Điện",["Mất điện", "Thay đèn", "Thay ổ cắm", "Thay công tắc", "Cấp thêm nguồn điện", "Khác"]))
arrayVanDe.push(new VanDe(1, "Máy Lạnh",["Không lạnh", "Báo lỗi", "Chảy nước", "Máy kêu to", "Có mùi lạ", "Khác"]))
arrayVanDe.push(new VanDe(2, "Máy nước uống",["Không lạnh", "Không nóng", "Máy chảy nước", "Máy kêu to", "Có mùi lạ", "Nước có cặn", "Khác"]))
arrayVanDe.push(new VanDe(3, "Nước sinh hoạt",["Không có nước", "Nước yếu", "Rò nước", "Có mùi lạ", "Có cặn", "Khác"]))
arrayVanDe.push(new VanDe(4, "Nhà vệ sinh, khuôn viên",["Gạch bể", "Cửa nhà vệ sinh hư", "Lavabo rò nước", "Hư ổ khóa", "Đèn tinh dầu hư", "Không có nước", "Bể kính", "Hộp giấy hư", "Hộp đựng xà phòng hư", "Hư đèn", "Mất điện", "Khác"]))
arrayVanDe.push(new VanDe(5, "Khác",[""]))

formArray = []

function setup(){
    formArray = initFormArray()
    feedForm(formArray)
}

function initFormArray(){
    forms = []
    forms.push(new MainForm(3,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "1"));
    forms.push(new MainForm(1,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2610", "1"));
    forms.push(new MainForm(0,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu anus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "8"));
    forms.push(new MainForm(5,4,"Lorem ipsum dolor sit amet Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2602", "4"));
    forms.push(new MainForm(2,4,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maxsuscipit ligula sit amet tempor laoreet.","A2612", "1"));
    forms.push(new MainForm(3,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "1"));
    forms.push(new MainForm(1,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2610", "1"));
    forms.push(new MainForm(0,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu anus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "8"));
    forms.push(new MainForm(5,4,"Lorem ipsum dolor sit amet Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2602", "4"));
    forms.push(new MainForm(2,4,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maxsuscipit ligula sit amet tempor laoreet.","A2612", "1"));
    forms.push(new MainForm(3,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "1"));
    forms.push(new MainForm(1,0,"Lorem ipsum dollorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2610", "1"));
    forms.push(new MainForm(0,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu anus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "8"));
    forms.push(new MainForm(5,4,"Lorem ipsum dolor sit amet Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2602", "4"));
    forms.push(new MainForm(2,4,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maxsuscipit ligula sit amet tempor laoreet.","A2612", "1"));
    forms.push(new MainForm(3,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "1"));
    forms.push(new MainForm(1,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2610", "1"));
    forms.push(new MainForm(0,0,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu anus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2614", "8"));
    forms.push(new MainForm(5,4,"Lorem ipsum dolor sit amet Morbi eu ante maximus, cursus nunc a, posuere lorem. Vivamus suscipit ligula sit amet tempor laoreet.","A2602", "4"));
    forms.push(new MainForm(2,4,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ante maxsuscipit ligula sit amet tempor laoreet.","A2612", "1"));
    return forms
}

function feedForm(array){
    container = document.getElementById("scroll_view");
    container.innerHTML = ""
    str = ""
    console.log(array);
    for (let i=0; i<array.length; i++){
        vande = arrayVanDe[array[i].idVanDe].name;
        thongtin = arrayVanDe[array[i].idVanDe].thongtin[array[i].idThongTin]
        mota = array[i].moTa
        str += `<div class="form_container">
            <div class="general_info">
            <h1 id="tv_id">`+ (i+1) +`</h1>
            <h2 id="tv_vande">`+ vande + `</h2>
            <h2 id="tv_thongtin">` + thongtin + `</h2>
            </div>
            <div class="detail_info">
                <p id="tv_mota">`+ mota +`</p>
            </div>
        </div>`;

        //                 <div class="general_info">
        //                     <h1 id="tv_id">1</h1>
        //                     <h2 id="tv_vande">Dien</h2>
        //                     <h2 id="tv_thongtin">ko co dien</h2>
        //                 </div>
        //                 <div class="detail_info">
        //                     <p id="tv_mota">Morbi eu ante maximus, cursus nunc a, posuere lorem.</p>
        //                 </div>

        // console.log();
    }
    container.innerHTML = str;
}

