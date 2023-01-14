export const baseURL = "http://localhost:6278/";

export const getSectors = async () => {

  const request = await fetch(`${baseURL}sectors`);
  const response = await request.json();

  return response;

}

export const getCompanies = async () => {

  const request = await fetch(`${baseURL}companies`);
  const response = await request.json();

  return response
}

export const verifyUser = async (token) => {
  
  const request = await fetch(`${baseURL}auth/validate_user`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const response = await request.json();

  return response.is_admin;
}

export const getInfoUser = async (token) => {

  const request = await fetch(`${baseURL}users/profile`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const response = await request.json();

  return response;

}

export const getAllUsers = async (token) => {

  const request = await fetch(`${baseURL}users`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const response = await request.json();

  return response;

}

export const getAllDepartament = async (token) => {

  const request = await fetch(`${baseURL}departments`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const response = await request.json();

  return response;

}

export const getDepartament = async (token, idCompanie) => {
  const request = await fetch(`${baseURL}departments/${idCompanie}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const response = await request.json();

  return response;
}

export const getCoWorkers = async (token) => {
  const request = await fetch(`${baseURL}users/departments/coworkers`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const response = await request.json();

  return response;
}