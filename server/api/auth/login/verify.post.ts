// server/api/auth/login/verify.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await backendFetch(event, "/api/v1/auth/login/verify", {
    method: "POST",
    body,
  });
});
