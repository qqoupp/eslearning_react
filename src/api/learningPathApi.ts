import baseQuery from "./baseQuery";

// Corrected function signature and implementation
const addLearningPath = async (Id:number, body: any) => {
    return await baseQuery({
      endpoint: `learningPaths/bulk/${Id}`, // Correctly construct the endpoint with userId
      body, // Ensure 'body' correctly represents the payload for your POST request
      options: { method: "POST" },
    });
  };
  
  

const getLearningPath = async (userId: number) => {
  return await baseQuery({
    endpoint: `learningPaths/${userId}`,
    options: { method: "GET" },
  });
};

const deleteLearningPath = async (id: number) => {
  return await baseQuery({
    endpoint: `learningPaths/${id}`,
    options: { method: "DELETE" },
  });
};

export { addLearningPath, getLearningPath, deleteLearningPath };
