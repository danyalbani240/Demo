export function usePulseError() {
  let shake = ref(false);
  let toast = useToast();
  function pulseError(message?: string) {
    shake.value = true;
    setTimeout(() => (shake.value = false), 450);
    if (message)
      toast.add({
        title: "خطا",
        description: message,
        color: "error",
      });
  }
  return { shake, pulseError };
}
