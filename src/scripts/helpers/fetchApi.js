/*
 * Get data form server
*/
const get = async (url) => {
  const response = await fetch(url);
  return response.json();
};

/**
 * Post new data to server
*/
const post = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // the original media type of the resource
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return res.json(); // parse the JSON to object
};

/**
 * Delete data
*/
const remove = async (url) => {
  const res = await fetch(url, {
    method: "DELETE",
  });
  return res.json();
};

/**
 * Send a changed data to server using method PATCH to updating the data
*/
const update = async (url, data) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export {
  get, post, remove, update,
};
