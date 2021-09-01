export const makeSerialGetQuerys = (arrUrls, executeFunc, currentQuery = 0) => {

  const resultHandler = (response) => {
    if ( response.error !== undefined )
      alert(response.error);
    else if ( response.result !== "" ) {
      executeFunc(response); 
      if (arrUrls[currentQuery + 1] !== undefined) {
        makeSerialGetQuerys(arrUrls, executeFunc, currentQuery += 1);
      }
    }
  }
 
  const errorHandler = (jqXHR,statusStr,errorStr) => {
    alert(statusStr+' '+errorStr);
  }

  $.ajax({
    type: "GET",
    url: arrUrls[currentQuery],
    cache : false, 
    dataType:'json',
    success : resultHandler, 
    error : errorHandler
  });
}