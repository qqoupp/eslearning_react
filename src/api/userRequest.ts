import baseQuery from "./baseQuery";

const saveUserRequest = async (body: any) => {
  return await baseQuery({
    endpoint: "userRequests",
    body,
    options: { method: "POST" },
  });
}

const getUserRequests = async (userId: number) => {
    return await baseQuery({
        endpoint: `userRequests/${userId}`,
        options: { method: "GET" },
        });
}

export { saveUserRequest, getUserRequests};