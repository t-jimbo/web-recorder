/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export const oauthSignIn = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: "http://http://127.0.0.1:5173",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/devstorage.read_write",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  Object.entries(params).forEach(([key, val]) => {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", key);
    input.setAttribute("value", val);
    form.appendChild(input);
  });

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};
