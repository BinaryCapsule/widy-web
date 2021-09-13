export function httpBody(payload: any) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(payload),
  };
}
