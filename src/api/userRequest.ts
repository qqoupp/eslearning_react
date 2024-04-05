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

const deleteUserRequest = async (id: number) => {
    return await baseQuery({
        endpoint: `userRequests/${id}`,
        options: { method: "DELETE" },
    });
}

export { saveUserRequest, getUserRequests, deleteUserRequest};