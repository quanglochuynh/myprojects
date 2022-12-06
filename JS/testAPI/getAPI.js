let token;

let body = {
    "reqid": "GetDataYardPlan",
    "data": {
        "moreExp": true
    }
};

fetch('https://apiedepot.gsotgroup.vn/api/data/util/gettoken',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    }
).then(response => response.json())
.then(json => {
    token = json;
    console.log(token)
    loadDepot(token)
})



function loadDepot(tk){
    let body = {
        "token":tk.token,
        "reqtime":tk.reqtime,
        "data":{
            // "moreExp":'SELECT * FROM Depot'
            "moreExp":true
        },
        "appversion":17
    }
    console.log(body);

    fetch('https://apiedepot.gsotgroup.vn/api/data/process/GetDataYardPlan',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    }
    ).then(response => response.json())
    .then(json => {
        console.log(json)
    })
}
