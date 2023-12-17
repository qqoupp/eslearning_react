import baseQuery from "./baseQuery";


  export const login = async (body: any) => {
    return await baseQuery({
      endpoint: "users/login",
      body,
      options: { method: "POST" },
    });
  };

  export const register = async (body: any) => {
    return await baseQuery({
      endpoint: "users",
      body,
      options: { method: "POST" },
    });
  };

