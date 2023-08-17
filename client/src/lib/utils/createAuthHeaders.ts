function createAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  
  export {
      createAuthHeaders
  }