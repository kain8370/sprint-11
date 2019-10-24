export class Api {
    constructor(config) {
      this.url = config.url;
      this.headers = config.headers;
    }
  
    getResponse(result) {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    }
  
    getData() {
      return fetch(`${this.url}/users/me`, {headers: this.headers})
      .then((result) => this.getResponse(result));
    }
  
    getInitialCards() {
      return fetch(`${this.url}/cards`, {headers: this.headers})
      .then(result => this.getResponse(result));
    }
  
    sendUser(userName, userJob) {
        return fetch(`${this.url}/users/me`, { 
        method: 'PATCH',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          about: userJob
      })
      })
      .then(result => this.getResponse(result));
    }
  
    sendImage(nameImage, linkImage) {
        console.log(nameImage);
        return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameImage,
          link: linkImage
      })
      })
      .then(result => this.getResponse(result));
    }
}