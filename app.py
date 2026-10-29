import logging
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from pydantic import ValidationError


from llm_service import analyze_job_description


load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.get("/")
def home():
   return render_template("index.html")


@app.post("/api/analyze")
def analyze():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
      return jsonify({
        "error": "pleae send a valid JSON request."
    }), 400


    job_description = data.get("job_description","")

    if not isinstance(job_description, str):
       return jsonify({
          "error":"Job description must be text."
       }),400

    job_description = job_description.strip()

    if len(job_description) < 50:
       return jsonify({
          "error": "please enter a job description with at least 50 characters."
       })

    try:
       result = analyze_job_description(job_description)
       return jsonify(result.model_dump()), 200

    except ValidationError:
       logger.exception("structured output validation failed")
       return jsonify({
          "error":"The AI returned data that failed validation. Please try again"
        }), 502
    
    
    except ValueError as exc:
       logger.warning("AI response error: %s", exc)
       return jsonify({
          "error": "The AI retruned an empty or invalid response. Please try again."
       }), 502

    except Exception:
       #keep API keys and internal exception details out of responses.
       logger.exception("Job analysis failed")
       return jsonify({
          "error": "unable to analyze the job description. check your API configuration and try again."
       }), 502
    


if __name__ == "__main__":
   debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
   app.run(debug=debug_mode)