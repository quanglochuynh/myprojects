var sumAll;
var cArray = [];
const depotName = ["CHD", "CTC", "CSD", "GKP", "TBD", "PCD", "ECD", "ETD", "GKD", "CLD", "CPD"];
const depotID   = [    0,     1,     3,     4,    18,    27,    28,    32,    38,    39,    40] 
const tokenURL = 'https://apiedepot.gsotgroup.vn/api/data/util/gettoken'
const yardPlanURL = 'https://apiedepot.gsotgroup.vn/api/data/process/GetDataYardPlan'



async function getContArray(dpName){
    var myDepot = depotID[depotName.indexOf(dpName)]
    var data = {
        "moreExp": "DepotID=" + myDepot,
        "sortExp":"ID",
        "current_index":1,
        "next_index":1
    };
    
    var tokenAPI = {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "reqid": "GetDataYardPlan",
            "data": data
        })
    }
    const tk = await fetch(tokenURL, tokenAPI).then(response => response.json())
    let yardPlanAPI = {
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
    const cont0 = await fetch(yardPlanURL, yardPlanAPI).then(response => response.json())
    sumAll = cont0.data[0].total_row.r;
    var ci=1;
    const res = await batchLoadCont(tokenAPI,ci,myDepot);
    console.log("done", cArray)
}

async function batchLoadCont(tokenAPI,ci,myDepot){
    let idata = {
        "moreExp": "DepotID=" + myDepot,
        "sortExp":"ID",
        "current_index":ci,
        "next_index":900
    };
    tokenAPI.body = JSON.stringify({
        "reqid": "GetDataYardPlan",
        "data": idata
    })

    const new_tk = await fetch(tokenURL, tokenAPI).then(response => response.json())
    let yardPlanAPI = {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "token":new_tk.token,
            "reqtime":new_tk.reqtime,
            "data":idata,
            "appversion":17
        })
    }
    const contArray = await fetch(yardPlanURL, yardPlanAPI).then(response => response.json())
    cArray = cArray.concat(contArray.data)
    if (contArray.data.length ==0){
        return true;
    }
    ci += 1;
    return batchLoadCont(tokenAPI,ci,myDepot);
}

getContArray("ETD");

