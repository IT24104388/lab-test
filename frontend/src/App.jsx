import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const emptyForm = {
  name:     '',
  idNumber: '',
  faculty:  '',
  year:     '',
  semester: '',
  subjects: '',
  // TODO: Add your phone number field here
  // phone: '',
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [form,     setForm]     = useState(emptyForm);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        year:     Number(form.year),
        semester: Number(form.semester),
        subjects: form.subjects.split(',').map((s) => s.trim()).filter(Boolean),
        // TODO: Include your phone field in the payload here
        // phone: form.phone,
      };
      await axios.post(API_URL, payload);
      setForm(emptyForm);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Records</h1>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>

          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>ID Number</label>
            <input
              style={styles.input}
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              placeholder="e.g. STU2024001"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Faculty</label>
            <input
              style={styles.input}
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
              placeholder="e.g. Engineering"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Year</label>
            <input
              style={styles.input}
              name="year"
              type="number"
              min="1"
              max="6"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g. 2"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Semester</label>
            <input
              style={styles.input}
              name="semester"
              type="number"
              min="1"
              max="2"
              value={form.semester}
              onChange={handleChange}
              placeholder="1 or 2"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Subjects (comma separated)</label>
            <input
              style={styles.input}
              name="subjects"
              value={form.subjects}
              onChange={handleChange}
              placeholder="e.g. Maths, Physics, CS"
              required
            />
          </div>

          {/* TODO: Add your Phone Number input field here */}
          {/*
          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +94771234567"
              required
            />
          </div>
          */}

        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Saving...' : 'Add Student'}
        </button>
      </form>

      <h2 style={styles.subtitle}>All Records</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>ID Number</th>
              <th style={styles.th}>Faculty</th>
              <th style={styles.th}>Year</th>
              <th style={styles.th}>Semester</th>
              <th style={styles.th}>Subjects</th>
              {/* TODO: Add Phone Number column header here */}
              {/* <th style={styles.th}>Phone Number</th> */}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>No records yet.</td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={s._id} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.idNumber}</td>
                  <td style={styles.td}>{s.faculty}</td>
                  <td style={styles.td}>{s.year}</td>
                  <td style={styles.td}>{s.semester}</td>
                  <td style={styles.td}>{Array.isArray(s.subjects) ? s.subjects.join(', ') : s.subjects}</td>
                  {/* TODO: Add Phone Number data cell here */}
                  {/* <td style={styles.td}>{s.phone}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container:    { maxWidth: '1000px', margin: '0 auto', padding: '2rem', fontFamily: 'Segoe UI, Arial, sans-serif' },
  title:        { fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1a1a2e' },
  subtitle:     { fontSize: '1.3rem', margin: '2rem 0 1rem', color: '#1a1a2e' },
  error:        { color: '#c0392b', marginBottom: '1rem' },
  form:         { background: '#f5f7fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' },
  grid:         { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field:        { display: 'flex', flexDirection: 'column' },
  label:        { marginBottom: '0.3rem', fontWeight: '600', fontSize: '0.9rem', color: '#333' },
  input:        { padding: '0.5rem 0.75rem', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.95rem' },
  button:       { marginTop: '1.2rem', padding: '0.6rem 1.5rem', background: '#2c3e7a', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1rem', cursor: 'pointer' },
  tableWrapper: { overflowX: 'auto' },
  table:        { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  thead:        { background: '#2c3e7a', color: '#fff' },
  th:           { padding: '0.75rem 1rem', textAlign: 'left' },
  td:           { padding: '0.65rem 1rem', borderBottom: '1px solid #eee' },
  rowEven:      { background: '#fff' },
  rowOdd:       { background: '#f9f9f9' },
  empty:        { padding: '1rem', textAlign: 'center', color: '#888' },
};
