const getAxiosConfigWithToken = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt=')).split('=')[1];
  
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    return axiosConfig;
  };
  
  export default getAxiosConfigWithToken;
  