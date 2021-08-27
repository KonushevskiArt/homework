export class LocStorage {
  constructor(nameStorage) {
    this.storage = this.checkLocStorage(nameStorage);
    this.nameStorage = nameStorage;
  }

  checkLocStorage = (nameStorage) => {
    const data = localStorage.getItem(nameStorage);
    if (data !== null) {
      return JSON.parse(data);
    }
    return {};
  }

  addValue = (key, value) => {
    if (key in this.storage) {
      return false;
    } else {
      this.storage[key] = value;
      //
      localStorage.setItem(this.nameStorage, JSON.stringify(this.storage));
      return true;
    }
  }
  getValue = (key) => {
    return this.storage[key];
  }
  deleteValue = (key) => {
    if (key in this.storage) {
      delete this.storage[key];
      localStorage.setItem(this.nameStorage, JSON.stringify(this.storage));
      return true;
    } else {
      return false;
    }
  }
  getKeys = () => {
    return Object.keys(this.storage);
  }
}
