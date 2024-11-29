import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  // Function to calculate unique permutations
  const getUniquePermutations = (array) => {
    if (array.length === 1) return [array];
    const uniquePerms = new Set();
    array.forEach((item, index) => {
      const remaining = [...array.slice(0, index), ...array.slice(index + 1)];
      const subPerms = getUniquePermutations(remaining);
      subPerms.forEach((perm) => uniquePerms.add([item, ...perm].join("")));
    });
    return Array.from(uniquePerms).map((str) => str.split(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputArray = input.split("");
    if (inputArray.length === 0) {
      alert("Please enter some input!");
      return;
    }

    const uniquePermutations = getUniquePermutations(inputArray).map((perm) =>
      perm.join("")
    );
    setResult(uniquePermutations);
  };

  const distributeEqually = (array, numberOfTables) => {
    const chunkSize = Math.ceil(array.length / numberOfTables);
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const numberOfTables = 5; // Fixed to 5 tables
  const tableChunks = distributeEqually(result, numberOfTables);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Unique Permutations</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Enter Input:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type here..."
          required
        />
        <button type="submit" style={styles.button}>
          Calculate
        </button>
      </form>
      <div style={styles.resultContainer}>
        <h2 style={styles.resultHeader}>Results:</h2>
        {result.length > 0 ? (
          <div style={styles.tableContainer}>
            {tableChunks.map((chunk, tableIndex) => (
              <table key={tableIndex} style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>#</th>
                    <th style={styles.tableHeader}>Permutation</th>
                  </tr>
                </thead>
                <tbody>
                  {chunk.map((item, rowIndex) => (
                    <tr key={rowIndex} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        {tableIndex *
                          Math.ceil(result.length / numberOfTables) +
                          rowIndex +
                          1}
                      </td>
                      <td style={styles.tableCell}>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        ) : (
          <p style={styles.noResult}>
            No results to display. Try entering some input!
          </p>
        )}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    color: "#333",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4a90e2",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "200px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4a90e2",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  resultContainer: {
    marginTop: "20px",
  },
  resultHeader: {
    textAlign: "center",
    marginBottom: "10px",
  },
  tableContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  table: {
    borderCollapse: "collapse",
    width: "220px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    padding: "8px",
    textAlign: "left",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    padding: "8px",
    border: "1px solid #ddd",
  },
  noResult: {
    textAlign: "center",
    color: "#888",
    fontSize: "16px",
  },
};

export default App;
