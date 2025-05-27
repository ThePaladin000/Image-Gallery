export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // private method to fetch data with authentication
  _fetchWithAuth(endpoint, method = "GET", data) {
    const fetchOptions = {
      method,
      headers: this._headers,
    };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    return fetch(`${this._baseUrl}${endpoint}`, fetchOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  // public methods to fetch data from the API
  getUserInfo() {
    return this._fetchWithAuth("/users/me");
  }

  loadCards() {
    return this._fetchWithAuth("/cards");
  }

  addNewCard(data) {
    return this._fetchWithAuth("/cards", "POST", data);
  }

  editUserInfo(data) {
    return this._fetchWithAuth("/users/me", "PATCH", data);
  }

  editUserAvatar(data) {
    return this._fetchWithAuth("/users/me/avatar", "PATCH", data);
  }

  deleteCard(cardId) {
    return this._fetchWithAuth(`/cards/${cardId}`, "DELETE");
  }

  likeCard(cardId) {
    return this._fetchWithAuth(`/cards/${cardId}/likes`, "PUT");
  }

  dislikeCard(cardId) {
    return this._fetchWithAuth(`/cards/${cardId}/likes`, "DELETE");
  }
}
