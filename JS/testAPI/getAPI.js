let token;
let data = {
    "moreExp": "DepotID=32",
    "sortExp":"ID",
    "current_index":"100",
    "next_index":"29",
    // "moreExp": true
};

let body = {
    "reqid": "GetDataYardPlan",
    "data": data
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
        "data":data,
        "appversion":17
    }
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
