export class Service {
  arr = [];

  getListAPI = () => {
    return axios({
      url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
      method: "GET",
    });
  };
  
  getProductById = (id) => {
    return axios({
      url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${id}`,
      method: "GET",
    });
  }
  
}
