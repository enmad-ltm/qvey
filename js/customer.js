function schBtn (){
    var serchWord = $('input[name=custSchIp]').val();
    console.log('serchWord:', serchWord);
}

function rowChk(e) {
    $(e).find('input').prop('checked',function(){
        return !$(e).find('input').prop('checked');
    });
}

function custSubmit() {
    var submitRst = $('#rstTbl').serialize();
    console.log('submitRst:', submitRst);
}