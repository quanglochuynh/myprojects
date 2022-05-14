class MainForm{
    constructor(id_vande, id_thongtin, moTa, diaDiem, soLuong){
        this.idVanDe = id_vande;
        this.idThongTin=id_thongtin;
        this.moTa = moTa;
        this.diaDiem = diaDiem;
        this.soLuong = soLuong;
        this.status = 0;
    }
}

class VanDe{
    constructor(id, name, thongtin){
        this.id;
        this.name = name;
        this.thongtin = thongtin;
    }
}