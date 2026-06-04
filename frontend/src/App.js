import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);

  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [score, setScore] = useState(0);
  const [role, setRole] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        "http://127.0.0.1:5000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResumeText(data.text || "");
      setSkills(data.skills || []);
      setMissingSkills(data.missingSkills || []);
      setScore(data.score || 0);
      setRole(data.role || "");
      setSuggestions(data.suggestions || []);

    } catch (error) {
      console.error(error);
      alert("Error processing resume");
    }
  };

  const getScoreStatus = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Average";
    return "Poor";
  };

  const getScoreColor = () => {
    if (score >= 85) return "#37c89b";
    if (score >= 70) return "#37c89b";
    if (score >= 50) return "#fb923c";
    return "#ef4444";
  };

  return (
    <div className="app">

      <nav className="navbar">
        <h2>Resume Analyzer</h2>
      </nav>

      <section className="hero">

        <div className="hero-left">

          <p className="tagline">RESUME ANALYZER</p>

          <h1>
            Analyze Your Resume
            <br />
            Like a Professional
          </h1>

          <p className="description">
            Upload your resume and receive ATS analysis,
            skill detection, role recommendation,
            and improvement suggestions.
          </p>

          <div className="upload-box">

            <p>Upload PDF Resume</p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <p>
              {file
                ? `Selected: ${file.name}`
                : "No file selected"}
            </p>

            <button onClick={analyzeResume}>
              Analyze Resume
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="preview-card">

            <div
              className="score-circle"
              style={{
                borderColor: getScoreColor()
              }}
            >
              <h2 style={{ color: getScoreColor() }}>
                {score}
              </h2>

              <span>/100</span>
            </div>

            {score > 0 ? (
              <>
                <h3
                  style={{
                    color: getScoreColor(),
                    marginTop: "15px"
                  }}
                >
                  {getScoreStatus()}
                </h3>

                <div style={{ marginTop: "25px" }}>
                  <h3>Recommended Role</h3>

                  <p
                    style={{
                      color: "#37c89b",
                      fontWeight: "bold",
                      fontSize: "18px"
                    }}
                  >
                    {role}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "25px",
                    textAlign: "left"
                  }}
                >
                  <h3>Missing Skills</h3>

                  {missingSkills.length > 0 ? (
                    missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          background: "#ef4444",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          margin: "4px",
                          display: "inline-block",
                          fontSize: "14px"
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No major missing skills.</p>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "25px",
                    textAlign: "left"
                  }}
                >
                  <h3>Areas to Improve</h3>

                  {suggestions.length > 0 ? (
                    <ul
                      style={{
                        marginTop: "10px",
                        paddingLeft: "20px"
                      }}
                    >
                      {suggestions.map((item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Great resume. No major suggestions.</p>
                  )}
                </div>

              </>
            ) : (
              <p
                style={{
                  marginTop: "20px",
                  color: "#666"
                }}
              >
                Upload a resume to begin analysis
              </p>
            )}

          </div>

        </div>

      </section>

      {(skills.length > 0 || resumeText) && (

        <div
          style={{
            background: "white",
            margin: "40px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
          }}
        >

          <h2>Detected Skills</h2>

          <div style={{ marginTop: "15px" }}>

            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "#37c89b",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "20px",
                    margin: "5px",
                    display: "inline-block"
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills detected.</p>
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default App;