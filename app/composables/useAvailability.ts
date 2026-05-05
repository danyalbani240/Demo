// composables/useAvailability.ts

export function useAvailability() {
  const loading = ref(false);

  async function fetchAvailability(
    providerId: string,
    serviceIds: string[],
    dateKey: string,
  ) {
    let toast = useToast();

    loading.value = true;
    if (serviceIds.length == 0) {
      toast.add({
        title: "خطا",
        description: "جهت رزرو حداقل یک سرویس را انتخاب نمایید.",
        color: "error",
      });
      return;
    }
    try {
      const res: any = await $fetch("/api/bookings/availability", {
        method: "GET",
        query: {
          providerId,
          serviceIds: serviceIds.join(","),
          dateKey,
        },
      });

      if (!res?.success) {
        toast.add({
          title: "خطا",
          description: res?.message || "خطا در دریافت ساعت‌ها",
          color: "error",
        });
        return;
      }

      return res.data.slots;
    } catch (e: any) {
      // error.value = e?.data?.message || e?.message || "خطا در دریافت ساعت‌ها";
      console.log(e);
    } finally {
      loading.value = false;
    }
  }

  return {
    loadingSlots: loading,
    fetchAvailability,
  };
}
