function getDataFromDB(cbOK, cbFail) {
    fetch('./db.json')
    .then(resp => resp.json())
    .then(data => {
        cbOK(data);
    })
    .catch(function(error) {
        cbFail(error);
    }); 
}