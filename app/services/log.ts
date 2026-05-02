export const sendLog = async (logData: any) => {
  try {
    await fetch("/api/log", {
      method: "POST",
      body: JSON.stringify(logData),
    });
  } catch (err) {
    console.log("Log failed");
  }
};