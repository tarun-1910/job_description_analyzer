
const jobDescription = document.getElementById("jobDescription");
const analyzeButton = document.getElementById("analyzeButton");
const statusElement = document.getElementById("status");
const resultsSection = document.getElementById("results");
const charCount = document.getElementById("charCount");
const copyButton = document.getElementById("copyButton");


console.log({
    jobDescription,
    analyzeButton,
    statusElement,
    resultsSection,
    charCount,
    copyButton
});

let latestResult = null;

jobDescription.addEventListener("input", () => {
    charCount.textContent =
        `${jobDescription.value.length} / 15000 characters`;
});

function addListItems(elementId, items) {
    const list = document.getElementById(elementId);
    list.replaceChildren();

    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}


function renderResults(data) {
    const getElement = (id) => {
        const element = document.getElementById(id);

        if (!element) {
            throw new Error(`Missing HTML element: #${id}`);
        }

        return element;
    };

    getElement("jobTitle").textContent = data.job_title;
    getElement("experienceLevel").textContent = data.experience_level;
    getElement("jobSummary").textContent = data.job_summary;

    addListItems("requiredSkills", data.required_skills);
    addListItems("responsibilities", data.responsibilities);

    const priorities = getElement("learningPriorities");
    priorities.replaceChildren();

    data.learning_priorities.forEach((item) => {
        const card = document.createElement("article");
        card.className = "priority-item";

        const title = document.createElement("h4");
        title.textContent = item.skill;

        const badge = document.createElement("span");
        badge.className = `priority-badge ${item.priority.toLowerCase()}`;
        badge.textContent = `${item.priority} priority`;

        const reason = document.createElement("p");
        reason.textContent = item.reason;

        card.append(title, badge, reason);
        priorities.appendChild(card);
    });

    const results = getElement("results");
    results.hidden = false;
    results.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


analyzeButton.addEventListener("click", async () => {
    const description = jobDescription.value.trim();

    if (description.length < 50) {
        statusElement.textContent =
            "Please enter at least 50 characters.";
        statusElement.className = "status error";
        return;
    }

    if (description.length > 15000) {
        statusElement.textContent =
            "Please keep the description under 15,000 characters.";
        statusElement.className = "status error";
        return;
    }

    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analyzing...";
    statusElement.textContent = "Sending the job description to the AI...";
    statusElement.className = "status";
    resultsSection.hidden = true;

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_description: description
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Analysis failed.");
        }

        latestResult = data;
        renderResults(data);

        statusElement.textContent = "Analysis completed successfully.";
        statusElement.className = "status success";
    } catch (error) {
        statusElement.textContent =
            error.message || "Something went wrong. Please try again.";
        statusElement.className = "status error";
    } finally {
        analyzeButton.disabled = false;
        analyzeButton.textContent = "Analyze Job Description";
    }
});

copyButton.addEventListener("click", async () => {
    if (!latestResult) return;

    try {
        await navigator.clipboard.writeText(
            JSON.stringify(latestResult, null, 2)
        );
        copyButton.textContent = "JSON Copied!";
    } catch {
        statusElement.textContent =
            "Could not copy automatically. Please try another browser.";
        statusElement.className = "status error";
    }
});
