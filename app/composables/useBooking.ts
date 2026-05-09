// composables/useBooking.ts
import type { BookingPayload } from "~/types";
export function useBooking() {
  const loading = ref(false);
  const error = ref("");

  async function initiatePayment(payload: BookingPayload) {
    const res: any = await $fetch("/api/payment/initiate", {
      method: "POST",
      body: payload,
    });

    if (!res?.success) {
      throw new Error(res?.message || "شروع پرداخت ناموفق بود");
    }

    return res.data;
  }

  async function handleBooking(payload: BookingPayload) {
    const toast = useToast();
    const isLoggedIn = useAuthStore().isAuthed;
    if (!isLoggedIn) {
      toast.add({
        title: "اخطار",
        description: "قبل از رزرو باید لاگین کنید",
        color: "error",
      });
      return;
    }

    loading.value = true;
    error.value = "";
    try {
      const data = await initiatePayment(payload);
      window.location.href = data.redirectUrl;
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || "خطا در شروع پرداخت";
    } finally {
      loading.value = false;
    }
  }

  return {
    bookingLoading: loading,
    bookingError: error,
    handleBooking,
  };
}
