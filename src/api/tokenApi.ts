import baseQuery from "./baseQuery";

const accessTokenVerification = async (body: any) => {
  return await baseQuery({
    endpoint: "tokens/validate",
    body,
    options: { method: "POST" },
  });
};

const refreshToken = async (body: any) => {
    return await baseQuery({
        endpoint: "tokens/refresh",
        body,
        options: { method: "POST" },
    });
}

export  {accessTokenVerification, refreshToken};
