
export const fetchStream = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    const endpoint = `${process.env.REACT_APP_API_URL}llm`;
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

export const fetchInstructionStream = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
  const endpoint = `${process.env.REACT_APP_API_URL}llm/instruction`;
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

export const fetchInstructionQueryStream = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
  const endpoint = `${process.env.REACT_APP_API_URL}llm/instructionQuery`;
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