function login(){
    username = document.getElementById("edtx_username").value;
    password = document.getElementById("edtx_password").value;
    if ((username=="admin") && (password=="admin")){
        location.replace("mainform.html")
    }
}


function setup(){
    document.getElementById("btn_login").setAttribute("onclick", "login()")
    console.log("Done");
}