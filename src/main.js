import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Backend run at port ${PORT}`);
});