export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === "production"
      ? "https://www.google.com"
      : "http://localhost:3000"
  );
};
