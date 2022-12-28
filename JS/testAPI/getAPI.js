let token;



function loadDepot(tk,data){
    fetch('https://apiedepot.gsotgroup.vn/api/data/process/GetDataYardPlan',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "token":tk.token,
            "reqtime":tk.reqtime,
            "data":data,
            "appversion":17
        })
    }
    ).then(response => response.json())
    .then(json => {
        console.log(json)
        return
    })
}

function getCont(ci,pi){
    let data = {
        "moreExp": "DepotID=39",
        "sortExp":"ID",
        "current_index":ci,
        "next_index":pi
    };
    fetch('https://apiedepot.gsotgroup.vn/api/data/util/gettoken',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "reqid": "GetDataYardPlan",
            "data": data
        })
    }
    ).then(response => response.json())
    .then(json => {
        token = json;
        console.log(token)
        loadDepot(token,data)
    })

}

k = getCont(1,1)