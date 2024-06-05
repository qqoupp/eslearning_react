import baseQuery from "./baseQuery";

const getProjectIdeea = async () => {
  return await baseQuery({
    endpoint: "projectIdeas",
    options: { method: "GET" },
  });
}

export { getProjectIdeea };