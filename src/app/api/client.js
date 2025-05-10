export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const client = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    return res.json();
  },

  // post: async (endpoint, body) => {
  //   const res = await fetch(`${BASE_URL}${endpoint}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   return res.json();
  // },

  post: async (endpoint, body) => {
    const isFormData = body instanceof FormData;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: isFormData
        ? {
            /* Don't set Content-Type for FormData */
          }
        : {
            "Content-Type": "application/json",
          },
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "API error");
    }

    return res.json();
  },

  put: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
