export default class FetchData {
  private static headers: Headers | string[][] | Record<string, string> = {
    'Content-type': 'application/json; charset=UTF-8'
  }

  static async get(url: string, options?: RequestInit) {
    const res = await fetch(url, options)
    return await res.json()
  }

  static async post() {
  }

  static async put(url: string, data: object) {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this.headers
    })
    return await res.json()
  }

  static async delete() {

  }
}