/**
* Get data from backend, currently reads a json file directly. 
* Replace with actual server call 
* @author  Harshanie Gomes
* @param   {function} cbOK    callback function , when data is read
* @param   {function} cbFail  callback function , when data is read fails
* @return  {}
*/

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

export { getDataFromDB };