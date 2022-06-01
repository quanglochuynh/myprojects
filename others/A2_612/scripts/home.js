arrayVanDe = []
arrayVanDe.push(new VanDe(0, "Điện",["Mất điện", "Thay đèn", "Thay ổ cắm", "Thay công tắc", "Cấp thêm nguồn điện", "Khác"]))
arrayVanDe.push(new VanDe(1, "Máy Lạnh",["Không lạnh", "Báo lỗi", "Chảy nước", "Máy kêu to", "Có mùi lạ", "Khác"]))
arrayVanDe.push(new VanDe(2, "Máy nước uống",["Không lạnh", "Không nóng", "Máy chảy nước", "Máy kêu to", "Có mùi lạ", "Nước có cặn", "Khác"]))
arrayVanDe.push(new VanDe(3, "Nước sinh hoạt",["Không có nước", "Nước yếu", "Rò nước", "Có mùi lạ", "Có cặn", "Khác"]))
arrayVanDe.push(new VanDe(4, "Nhà vệ sinh, khuôn viên",["Gạch bể", "Cửa nhà vệ sinh hư", "Lavabo rò nước", "Hư ổ khóa", "Đèn tinh dầu hư", "Không có nước", "Bể kính", "Hộp giấy hư", "Hộp đựng xà phòng hư", "Hư đèn", "Mất điện", "Khác"]))
arrayVanDe.push(new VanDe(5, "Khác",[""]))

function processImage(event){
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   const uploaded_image = reader.result;
    //   document.querySelector("#image_view").style.backgroundImage = `url(${uploaded_image})`;
    // });
    // reader.readAsDataURL(this.files[0]);
    image = event.target.files[0];
    dir = URL.createObjectURL(image);
    document.getElementById("image_view").src = dir;
    console.log(dir);     
}


let id = 0;
console.log(id);

function setup(){
    initRequirement(id);
    dropdownVanDe = document.getElementById("chon_van_de");
    option_array = [];
    option = document.createElement('option');
    for (let i=0; i<arrayVanDe.length; i++){
        option.text = option.value = arrayVanDe[i].name;
        option_array.push(option.outerHTML);
    }
    dropdownVanDe.insertAdjacentHTML('beforeEnd', option_array.join('\n'));


}

function initRequirement(id){
    dropdownYeuCau = document.getElementById("chon_thong_tin");
    dropdownYeuCau.innerHTML = "";
    vande = arrayVanDe[id];
    console.log(vande);
    option_array = [];
    option = document.createElement('option');
    for (let i=0; i<vande.thongtin.length; i++){
        option.text = option.value = vande.thongtin[i];
        option_array.push(option.outerHTML);
    }
    dropdownYeuCau.insertAdjacentHTML('beforeEnd', option_array.join('\n'));
}

function chooseProblem(){
    dropdownVanDe = document.getElementById("chon_van_de")
    id = dropdownVanDe.selectedIndex
    console.log(id);
    initRequirement(id);
}