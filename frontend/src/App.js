import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const initialForm = {
  title: '',
  researcherName: '',
  email: '',
  institution: '',
  domain: '',
  background: '',
  problemStatement: '',
  objectives: '',
  methodology: '',
  expectedOutcome: '',
  timeline: '',
  references: ''
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/research-questions`, form);
      setMessage(`Saved successfully with ID: ${response.data.id}`);
      setForm(initialForm);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Unable to save form. Verify backend URL and CORS settings.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Research Question Submission Form</h1>
      <form onSubmit={onSubmit}>
        <input name="title" placeholder="Research Title" value={form.title} onChange={onChange} required />
        <input
          name="researcherName"
          placeholder="Researcher Full Name"
          value={form.researcherName}
          onChange={onChange}
          required
        />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="institution" placeholder="Institution" value={form.institution} onChange={onChange} required />
        <input name="domain" placeholder="Research Domain" value={form.domain} onChange={onChange} required />

        <textarea
          name="background"
          placeholder="Background and context"
          value={form.background}
          onChange={onChange}
          rows="4"
          required
        />
        <textarea
          name="problemStatement"
          placeholder="Problem statement"
          value={form.problemStatement}
          onChange={onChange}
          rows="4"
          required
        />
        <textarea
          name="objectives"
          placeholder="Objectives"
          value={form.objectives}
          onChange={onChange}
          rows="4"
          required
        />
        <textarea
          name="methodology"
          placeholder="Methodology"
          value={form.methodology}
          onChange={onChange}
          rows="5"
          required
        />
        <textarea
          name="expectedOutcome"
          placeholder="Expected outcomes"
          value={form.expectedOutcome}
          onChange={onChange}
          rows="4"
          required
        />
        <textarea
          name="timeline"
          placeholder="Timeline / milestones"
          value={form.timeline}
          onChange={onChange}
          rows="3"
          required
        />
        <textarea
          name="references"
          placeholder="References"
          value={form.references}
          onChange={onChange}
          rows="4"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit Research Question'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
