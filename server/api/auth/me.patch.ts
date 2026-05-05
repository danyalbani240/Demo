export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    const response = await backendFetch(event, '/api/v1/auth/me', {
      method: 'PATCH',
      body
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'به‌روزرسانی پروفایل ناموفق بود'
    });
  }
});
