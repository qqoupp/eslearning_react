type BaseQueryOptions = {
  method?: "POST" | "GET" | "PUT" | "DELETE";
  body?: any;
  options?: any;
  endpoint: string;
};

const baseQuery = async ({
  endpoint,
  body,
  options = {},
}: BaseQueryOptions) => {
  const { method = "GET", ...customConfig } = options;

  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("LLMUNI_TOKEN");

  //TO DO
  // CHECK IF TOKEN IS EXPIRED AND REFRESH IT

  

  const config = {
    method,
    ...customConfig,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
      ...customConfig.headers,
    },
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    ...config,
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if(data?.token){
    localStorage.setItem("LLMUNI_TOKEN", data.token);
  }

  return data;

};

export default baseQuery;
