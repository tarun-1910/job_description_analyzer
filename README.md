# AI Job Analyzer

A simple AI-powered tool that analyzes job descriptions and extracts the skills, responsibilities, experience level, and learning priorities using Google's Gemini API.

## Features

- Extracts job title and experience level.
- Generates a short job summary.
- Identifies required skills and responsibilities.
- Categorizes learning priorities into High, Medium, and Low.
- Returns structured JSON using Pydantic.

## Tech Stack

- Python & Flask
- Google Gemini API
- Pydantic
- HTML, CSS & JavaScript

## Setup

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/ai-job-analyzer.git
cd ai-job-analyzer
```

**2. Install dependencies**

```bash
pip install -r requirements.txt
```

**3. Create a `.env` file**

```env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=your_model_name
```

**4. Run the application**

```bash
python app.py
```

Open `http://127.0.0.1:5000` in your browser.

## What I Learned

- Working with LLM APIs
- Prompt engineering
- Structured outputs
- Pydantic schema validation
- Flask REST APIs
- Frontend and backend integration

## Future Improvements

- Resume analysis
- Resume and job description matching
- Skill gap analysis
- Personalized learning roadmap
