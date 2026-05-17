export const isDevMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("DEV_MODE") === "true" || process.env.NODE_ENV === "development";
  }
  return process.env.NODE_ENV === "development";
};

export const toggleDevMode = (enabled: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("DEV_MODE", enabled ? "true" : "false");
  }
};