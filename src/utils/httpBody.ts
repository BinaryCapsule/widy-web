export function httpBody(payload: unknown) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(payload),
  };
}
