# Resume Analyzer

## Overview

Resume Analyzer is a web application that evaluates resumes and provides useful insights based on resume content.

The system extracts text from PDF resumes, identifies technical skills, calculates an ATS-style score, recommends suitable job roles, and suggests areas for improvement.

## Features

* Upload PDF Resume
* Resume Text Extraction
* Technical Skill Detection
* ATS Score Calculation
* Missing Skills Identification
* Job Role Recommendation
* Resume Improvement Suggestions

## Technologies Used

### Frontend

* React.js
* CSS

### Backend

* Flask
* Flask-CORS
* PyPDF2

## How It Works

1. User uploads a PDF resume.
2. The backend extracts text from the resume.
3. Skills are detected using keyword matching.
4. An ATS-style score is calculated based on:

   * Education section
   * Experience section
   * Projects section
   * Technical skills
   * Professional profiles
5. Missing skills are identified.
6. A suitable job role is recommended.
7. Improvement suggestions are generated.

## Project Structure

Resume-Analyzer

* frontend

  * React Application

* backend

  * Flask API

## Future Improvements

* Job Description Matching
* Resume Ranking
* Resume PDF Report Generation
* Advanced Resume Parsing
* Database Integration
