// ai.js

// 🔹 Fallback logic (NON-AI safety net)
function fallbackInsight(queue) {
  if (queue.count > 20) {
    return `Crowd density is increasing at ${queue.name}.
Optimal visit window: 20–30 minutes later.
Suggested alternative: Library Café.`;
  }

  return `${queue.name} is moderately busy.
Expected wait time: ${queue.wait} minutes.
You can proceed now for minimal congestion.`;
}

// 🔹 Gemini-powered insight (PRIMARY)
async function generateInsight(queue) {
  try {
    // 🔥 Call your EXISTING Gemini backend
    const response = await fetch("http://localhost:3000/api/insight");

    const data = await response.json();

    // Backend returns: { text: "..." }
    return data.text || fallbackInsight(queue);

  } catch (error) {
    console.warn("⚠️ Gemini unavailable. Using fallback logic.");
    return fallbackInsight(queue);
  }
}

