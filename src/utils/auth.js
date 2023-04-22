export default class Auth {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  authorize(data) {
    return this.sendRequest("/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  register(data) {
    return this.sendRequest("/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async checkToken(token) {
    try {
      const data = await this.sendRequest(`/users/me`, {
        headers: {
          ...(this._options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });

      return data
    } catch (errCode) {
      if (errCode === 401) return false;
      throw errCode;
    }
  }

  async sendRequest(path, opts = {}) {
    const response = await fetch(`${this._baseUrl}${path}`, {
      ...this._options,
      ...opts,
    });

    if (!response.ok) throw response.status;

    return response.json();
  }
}
