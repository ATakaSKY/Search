import React from "react";
import "./Results.css";

export default function Results({ data }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Submission Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(result => (
            <tr key={result.url}>
              <td>
                <a target="_blank" rel="noopener noreferrer" href={result.url}>
                  {result.title}
                </a>
              </td>
              <td>{result.author}</td>
              <td>{result.sub_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
