export function useProviderNavigation() {
  function goProvider(id: string) {
    navigateTo(`/providers/profile/${id}`);
  }

  function startBooking(providerId: string) {
    navigateTo({ path: "/booking", query: { provider: providerId } });
  }

  return { goProvider, startBooking };
}
export function useSearchNavigation() {
  function searchByCategory(cat: string) {
    navigateTo("Search?category=" + cat);
  }
  return { searchByCategory };
}
