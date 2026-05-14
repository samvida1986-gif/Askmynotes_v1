document.addEventListener("DOMContentLoaded", () => {

  const question      = document.querySelector("#question");
  const askBtn        = document.querySelector("#ask-btn");
  const status        = document.querySelector("#status");
  const answer        = document.querySelector("#answer");
  const answerText    = document.querySelector("#answer-text");
  const typePill      = document.querySelector("#type-pill");
  const toolPill      = document.querySelector("#tool-pill");
  const sourcesEl     = document.querySelector("#sources-wrap");  // the <details>
  const sourcesListEl = document.querySelector("#sources");       // the <ol>

  const pdfInput      = document.querySelector("#pdf-input");
  const uploadStatus  = document.querySelector("#upload-status");

  const QTYPE_COLORS = {
    definition: "px-2 py-1 rounded text-xs bg-blue-100 text-blue-700",
    example:    "px-2 py-1 rounded text-xs bg-green-100 text-green-700",
    comparison: "px-2 py-1 rounded text-xs bg-purple-100 text-purple-700",
  };

  function resetAnswerUI() {
    answerText.textContent = "Your answer will appear here...";
    typePill.textContent = "";
    typePill.className = "px-2 py-1 rounded text-xs bg-slate-200 text-slate-700 hidden";
    toolPill.textContent = "";
    toolPill.className = "px-2 py-1 rounded text-xs bg-slate-200 text-slate-700 hidden";
    sourcesEl.classList.add("hidden");
    sourcesListEl.innerHTML = "";
  }

  // Task 1 — File input
  pdfInput.addEventListener("change", handleUpload);

  function handleUpload() {
    const file = pdfInput.files[0];

    if (!file) {
      uploadStatus.textContent = "";
      uploadStatus.className = "";
      return;
    }

    uploadStatus.textContent = `Selected "${file.name}" (ready to upload)`;
    uploadStatus.className = "text-sm text-green-600 mt-2 min-h-[1.25rem]";
  }

  // Task 2 — Submit button
  askBtn.addEventListener("click", () => {

    // Step 1 — Validate
    const q = question.value.trim();

    if (!q) {
      status.textContent = "Please type a question first.";
      status.className = "text-sm text-red-500 mt-2 min-h-[1.25rem]";
      resetAnswerUI();
      return;
    }

    // Step 2 — Show loading
    resetAnswerUI();
    status.textContent = "Thinking...";
    status.className = "text-sm text-gray-500 mt-2 min-h-[1.25rem]";

    // Step 3 — Simulate delay
    setTimeout(() => {

      const qLower = q.toLowerCase();

      // Step 4 — Question type
      let placeholderType;

      if (qLower.startsWith("what is")) {
        placeholderType = "definition";
      } else if (qLower.startsWith("give") || qLower.includes("example")) {
        placeholderType = "example";
      } else if (
        qLower.includes("vs") ||
        qLower.includes("versus") ||
        qLower.includes("compare") ||
        qLower.includes("difference")
      ) {
        placeholderType = "comparison";
      } else {
        placeholderType = "definition";
      }

      // Step 5 — Tool
      const isArithmetic = /^[\d\s\+\-\*\/\(\)\.]+$/.test(q);
      const placeholderTool = isArithmetic ? "calculator" : "search_notes";

      // Step 6 — Answer text
      answerText.textContent = `Placeholder answer for: "${q}". Real answers will appear here once the backend is connected.`;

      // Step 7 — Type pill
      typePill.textContent = `type: ${placeholderType}`;
      typePill.className = QTYPE_COLORS[placeholderType];

      // Tool pill
      toolPill.textContent = `tool: ${placeholderTool}`;
      toolPill.className = "px-2 py-1 rounded text-xs bg-slate-200 text-slate-700";

      // Sources
      if (placeholderTool !== "calculator") {
        const chunks = [
          "Sample source chunk 1 — example excerpt from the uploaded notes.",
          "Sample source chunk 2 — another excerpt.",
          "Sample source chunk 3 — final excerpt.",
        ];

        chunks.forEach((chunk) => {
          const li = document.createElement("li");
          li.textContent = chunk;
          sourcesListEl.appendChild(li);
        });

        sourcesEl.classList.remove("hidden");
      }

      // Clear status
      status.textContent = "";
      status.className = "";

    }, 600);

  });

});