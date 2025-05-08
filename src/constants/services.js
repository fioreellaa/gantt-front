export const BASE_URL = "http://localhost:8080"
export const getFetch = async (url) => {
  let result = [null, null]
  try {
    const response = await fetch(url)
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
      body
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

export const putFetch = async (url, body) => {
  let result = [null, null]
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
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