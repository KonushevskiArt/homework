import { v4 as uuidv4 } from 'https://jspm.dev/uuid'; //uniq id

const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;

export class AJAXStorage {
  constructor (storageName) {
    this.url = ajaxHandlerScript;
    this.storageName = storageName;
    this.storage = null;
  }

  
  getRemoteStorage = (stringName, executeScript) => {

    const resultHandler = (callresult) => {
      if ( callresult.error !== undefined )
        alert(callresult.error);
      else if ( callresult.result !== "" ) {
        const response = JSON.parse(callresult.result);

        executeScript(stringName, response);
      }
    }
    $.ajax(
      {
        url : this.url,
        type : 'POST', 
        cache : false, 
        dataType:'json',
        data : { f : 'READ', n : stringName },
        success : resultHandler, 
        error : this.errorHandler
      }
    );
  }

  updateStorage = (stringName, newStateStorage) => {
    updatePassword = uuidv4();
    $.ajax( 
      {
        url : this.url,
        type : 'POST',
        cache : false,
        dataType:'json',
        data : { f : 'LOCKGET', n : stringName, p : updatePassword },
        success : lockGetReady,
        error : this.errorHandler
      }
    );

    function lockGetReady(callresult) {
      if ( callresult.error !== undefined )
          alert(callresult.error);
      else {
          $.ajax( 
            {
              url : this.url,
              type : 'POST',
              cache : false, 
              dataType:'json',
              data : { f : 'UPDATE', n : stringName, v : JSON.stringify(newStateStorage), p : updatePassword },
              success : this.updateReady,
              error : this.errorHandler
            }
          );
      }
    }
  }

  updateReady(callresult) {
    if ( callresult.error!=undefined ) {
      alert(callresult.error);
    }
  } 

  errorHandler = (jqXHR, statusStr, errorStr) => {
    alert(statusStr+' '+errorStr);
  }

  addValue = (key, value) => {
    this.storage[key] = value;
    this.updateStorage(this.storageName, this.storage);
    return true;
  }

  getValue = (key) => {
    return this.storage[key];
  }

  deleteValue = (key) => {
    if (key in this.storage) {
      const wasDeleted = delete this.storage[key];
      this.updateStorage(this.storageName, this.storage);
      return wasDeleted;
    } else {
      return false;
    }
  }
  getKeys = () => {
    return Object.keys(this.storage);
  }
}