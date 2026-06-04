from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re

app = Flask(__name__)
CORS(app)

skills_db = [
    "python",
    "java",
    "c++",
    "sql",
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "firebase",
    "mongodb",
    "machine learning",
    "deep learning",
    "data science",
    "flask",
    "django",
    "git",
    "github",
    "SQL",
    "Node",
    "Javascript"
    "linux",
    "aws",
    "azure",
    "data structures",
    "algorithms"
]

recommended_skills = [
    "python",
    "sql",
    "html",
    "css",
    "javascript",
    "git",
    "github",
    "react",
    "aws"
]


@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running"
    })


@app.route("/analyze", methods=["POST"])
def analyze_resume():

    if "resume" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["resume"]

    try:

        pdf_reader = PyPDF2.PdfReader(file)

        text = ""

        for page in pdf_reader.pages:

            extracted = page.extract_text()

            if extracted:
                text += extracted

        text_lower = text.lower()

        # -------------------------
        # Skill Detection
        # -------------------------

        found_skills = []

        for skill in skills_db:

            pattern = r"\b" + re.escape(skill.lower()) + r"\b"

            if re.search(pattern, text_lower):
                found_skills.append(skill)

        # -------------------------
        # Missing Skills
        # -------------------------

        missing_skills = []

        for skill in recommended_skills:

            if skill not in found_skills:
                missing_skills.append(skill)

        # -------------------------
        # ATS Score
        # -------------------------

        score = 0

        if "@" in text:
            score += 10

        if "education" in text_lower:
            score += 20

        if "project" in text_lower or "projects" in text_lower:
            score += 15

        if "experience" in text_lower or "internship" in text_lower:
            score += 20

        if "github" in text_lower:
            score += 10

        if "linkedin" in text_lower:
            score += 10

        score += min(len(found_skills) * 2, 20)

        ats_keywords = [
            "python",
            "sql",
            "react",
            "machine learning",
            "data structures"
        ]

        keyword_count = sum(
            1 for keyword in ats_keywords
            if keyword in text_lower
        )

        score += min(keyword_count * 2, 10)

        score = min(score, 100)

        # -------------------------
        # Job Match %
        # -------------------------

        match_percentage = int(
            (len(found_skills) / len(recommended_skills)) * 100
        )

        if match_percentage > 100:
            match_percentage = 100

        # -------------------------
        # Suggestions
        # -------------------------

        suggestions = []

        if "project" not in text_lower:
            suggestions.append("Add project section")

        if "experience" not in text_lower:
            suggestions.append("Add internship or experience")

        if len(found_skills) < 5:
            suggestions.append("Add more technical skills")

        if "github" not in text_lower:
            suggestions.append("Include GitHub profile")

        if "linkedin" not in text_lower:
            suggestions.append("Include LinkedIn profile")

        # -------------------------
        # Role Detection
        # -------------------------

        role = "General Developer"

        if (
            "react" in found_skills
            or "javascript" in found_skills
            or "html" in found_skills
            or "css" in found_skills
        ):
            role = "Frontend Developer"

        elif (
            "python" in found_skills
            and (
                "machine learning" in found_skills
                or "data science" in found_skills
            )
        ):
            role = "Data Scientist"

        elif (
            "python" in found_skills
            or "django" in found_skills
            or "flask" in found_skills
        ):
            role = "Backend Developer"

        elif (
            "aws" in found_skills
            or "docker" in found_skills
            or "linux" in found_skills
        ):
            role = "DevOps Engineer"

        return jsonify({
            "text": text,
            "skills": found_skills,
            "missingSkills": missing_skills,
            "score": score,
            "matchPercentage": match_percentage,
            "role": role,
            "suggestions": suggestions
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)