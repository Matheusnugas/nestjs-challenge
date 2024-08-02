function setStorageData(key, value, useLocal = false) {
    if (!key) throw new Error("No key specified");
    if (!value) throw new Error("No value specified");
  
    const jsonValue = JSON.stringify(value);
  
    let response = {
      success: false,
      message: "",
      data: {
        key,
        value,
      },
    };
  
    if (useLocal) {
      localStorage.setItem(key, jsonValue);
  
      response.success = true;
  
      response.message = `Item added to local storage.`;
    } else {
      sessionStorage.setItem(key, jsonValue);
  
      localStorage.setItem(key, jsonValue);
  
      response.success = true;
  
      response.message = `Item added to session storage.`;
    }
  
    return response;
  }
  
  function getStorageData(key) {
    if (!key) throw new Error("No key specified");
  
    let value = undefined;
  
    const localStorageData = localStorage.getItem(key);
    const sessionStorageData = sessionStorage.getItem(key);
  
    if (localStorageData) value = localStorageData;
    else if (sessionStorageData) value = sessionStorageData;
  
    if (value) value = JSON.parse(value);
  
    return value;
  }
  
  function removeStorageData(key) {
    let response = {
      success: false,
      message: "",
      data: {
        key,
      },
    };
  
    try {
      localStorage.removeItem(key);
  
      sessionStorage.removeItem(key);
  
      response.success = true;
    } catch (err) {
      response.message =
        "It was not possible to remove item from local storage. Please try again.";
    }
  
    return response;
  }
  
  const LocalStorage = {
    setStorageData,
    getStorageData,
    removeStorageData,
  };
  
  export default LocalStorage;
  