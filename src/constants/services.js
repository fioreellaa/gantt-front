export const BASE_URL = import.meta.env.VITE_API_URL

export const getFetch = async (url) => {
  let result = [null, null]
  try {
    const response = await fetch(url, {
      withCredntials: true,
      credentials: 'include'
    });
    
    if (!response.ok) {
      result[1] = {
        status: response.status,
        message: `Error: ${response.statusText}` //...
      }
      return result
    }

    const data = await response.json()
    
    result[0] = data
    return result
  }
  catch (ex) {
    result[1] = {
      status: 500,
      message: "Internal error.",
      ex
    }
    return result
  }
}

export const postFetch = async (url, body) => {
  let result = [null, null]
  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      withCredntials: true,
      credentials: "include",
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      result[1] = {
        status: response.status,
        message: `Error: ${response.statusText}`
      }
      //console.log("Enviando body 2:", body)

      return result
    }
    const contentType = response.headers.get("Content-Type");
    
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    result[0] = data
    //console.log("Enviando body 2:", body)

    return result
  }
  catch (ex) {
    result[1] = {
      status: 500,
      message: "Internal error.",
      ex
    }
    return result
  }
}

export const putFetch = async (url, body) => {
  let result = [null, null]
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      withCredntials: true,
      credentials: "include",
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      result[1] = {
        status: response.status,
        message: `Error: ${response.statusText}`
      }
      return result
    }

    const data = await response.json()
    result[0] = data
    return result
  }
  catch (ex) {
    result[1] = {
      status: 500,
      message: "Internal error.",
      ex
    }
    return result
  }
}