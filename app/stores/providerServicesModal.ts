import { defineStore } from "pinia";
import type { Provider, ServiceItem } from "~/types";
// used for cahcing too 
export const useProviderModalStore = defineStore("providerModal", () => {
  const isOpen = ref(false);
  const provider = ref<Provider | null>(null);

  // cache per providerId
  const servicesMap = ref<Record<string, ServiceItem[]>>({});

  function open(p: Provider) {
    provider.value = p;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function setServices(providerId: string, services: ServiceItem[]) {
    servicesMap.value[providerId] = services;
  }

  function getServices(providerId: string) {
    return servicesMap.value[providerId]; // can be [] (valid)
  }

  return {
    isOpen,
    provider,
    open,
    close,
    setServices,
    getServices,
  };
});
