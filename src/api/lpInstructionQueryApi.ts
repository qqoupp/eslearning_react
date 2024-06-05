import baseQuery from "./baseQuery";

// Corrected function signature and implementation
const addLearningPathInstructionsQuery = async (learningPathId:number,userId:number, body: any) => {
    return await baseQuery({
      endpoint: `lpInstructionsQuery/${learningPathId}/${userId}`, // Correctly construct the endpoint with userId
      body, // Ensure 'body' correctly represents the payload for your POST request
      options: { method: "POST" },
    });
  };

const getLearningPathInstructionsQuery = async (Id:number) => {
    return await baseQuery({
      endpoint: `lpInstructionsQuery/${Id}`, // Correctly construct the endpoint with userId
      options: { method: "GET" },
    });
  };

const deleteAllLearningPathInstructionsQuery = async (userId:number) => {
    return await baseQuery({
      endpoint: `lpInstructionsQuery/${userId}`, // Correctly construct the endpoint with userId
      options: { method: "DELETE" },
    });
  }

export { addLearningPathInstructionsQuery, getLearningPathInstructionsQuery, deleteAllLearningPathInstructionsQuery};