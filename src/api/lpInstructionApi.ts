import baseQuery from "./baseQuery";

// Corrected function signature and implementation
const addLearningPathInstructions = async (learningPathId:number,userId:number, body: any) => {
    return await baseQuery({
      endpoint: `lpInstructions/${learningPathId}/${userId}`, // Correctly construct the endpoint with userId
      body, // Ensure 'body' correctly represents the payload for your POST request
      options: { method: "POST" },
    });
  };

const getLearningPathInstructions = async (Id:number) => {
    return await baseQuery({
      endpoint: `lpInstructions/${Id}`, // Correctly construct the endpoint with userId
      options: { method: "GET" },
    });
  };

const deleteAllLearningPathInstructions = async (userId:number) => {
    return await baseQuery({
      endpoint: `lpInstructions/${userId}`, // Correctly construct the endpoint with userId
      options: { method: "DELETE" },
    });
  }

export { addLearningPathInstructions, getLearningPathInstructions, deleteAllLearningPathInstructions};