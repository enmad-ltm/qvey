function resend(e) {
        var tdLeng = $(e).parent('td').parent('tr').children('td').length;
    var tdInfo = {};
    for(var i=0; i<(tdLeng-1); i++){
        if($(e).parent('td').parent('tr').children('td').eq(i).children('input').length>0){
            tdInfo[i] = $(e).parent('td').parent('tr').children('td').eq(i).children('input').val();
        } else {
            tdInfo[i] = $(e).parent('td').parent('tr').children('td').eq(i).text();
        }
    };
    console.log('tdInfo: ',tdInfo);
    modalOpen('sendCf');
}