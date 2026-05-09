type Role = "customer" | "provider";

export function mapRoleToBackend(role: Role) {
  return role === "provider" ? "provider" : "user";
}
