var sumAll;
var cArray = [];

let data = {
    "moreExp": "DepotID=39",
    "sortExp":"ID",
    "current_index":1,
    "next_index":1
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
    fetch('ç',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "token":token.token,
            "reqtime":token.reqtime,
            "data":data,
            "appversion":17
        })
    }
    ).then(response => response.json())
    .then(json => {
        console.log(json)
        sumAll=json.data[0].total_row.r;
        data.current_index = 0;
        data.next_index = 500
        for (i=1; i<sumAll; i+=data.next_index){
            data.current_index +=1;
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
                    fetch('https://apiedepot.gsotgroup.vn/api/data/process/GetDataYardPlan',
                    {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify({
                            "token":token.token,
                            "reqtime":token.reqtime,
                            "data":data,
                            "appversion":17
                        })
                    }
                    ).then(response => response.json())
                    .then(json => {
                        // sumAll=json.data[0].total_row.r;
                        cArray.push(json.data)
                    })
                })
        }
    })
})

