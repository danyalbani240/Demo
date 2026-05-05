<script setup lang="ts">
const route = useRoute();

const pid = String(route.query.pid ?? "").trim();
const trackId = String(route.query.trackId ?? "").trim();
const success = String(route.query.success ?? "").trim(); // "1" or "0"
const status = String(route.query.status ?? "").trim();   // "-1,2,3,..."

if (!pid) {
  await navigateTo("/");
}

// Call verify (server truth)
const { data, error } = await useFetch("/api/payment/verify", {
  params: {
    pid,
    trackId: trackId || undefined,
    success: success || undefined,
    status: status || undefined,
  },
});

// accept both shapes
const d: any = data.value;
const ok = !error.value && (d?.success === true || d?.status === "success");

if (!ok) {
  await navigateTo(`/payment/failed?pid=${encodeURIComponent(pid)}`);
} else {
  await navigateTo(`/payment/success?pid=${encodeURIComponent(pid)}`);
}
</script>
