// streamApi.ts

/**
 * Initiates a fetch request to stream data from a specific endpoint.
 * 
 * @param prompt The user input or prompt to be sent to the API.
 * @returns A ReadableStreamDefaultReader to process the streamed response.
 */
export const fetchStream = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    const endpoint = 'http://localhost:6300/api/v1/llm';
    const token = localStorage.getItem("LLMUNI_TOKEN");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  
    const response = await fetch(endpoint, {
      method: 'POST', // or 'GET', depending on your API requirement
      headers,
      body: JSON.stringify({ prompt }), // Adjust based on your API's expected format
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response body reader');
    }
    
    return reader;
  };
  