const login = async (user: any) => {
  const data: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  };

  const request = await fetch(
    `${process.env.LOGIN_API}/Autorizacion/Usuario/Externo/Login`,
    data
  )
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      //console.log('Success (Login):', data);
      return data;
    })
    .catch();
  return request;
};

const authCode = async (info: any) => {
  const data: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(info),
  };

  const request = await fetch(`${process.env.LOGIN_MICROSOFT}/token`, data)
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      //console.log('Success (Code):', data);
      return data;
    })
    .catch();
  return request;
};

const tokenValidation = async (url: string, token: string) => {
  const data: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const request = await fetch(url, data)
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      console.log('Success (Token):', data);
      return data;
    })
    .catch();
  return request;
};

export { login, authCode, tokenValidation };
