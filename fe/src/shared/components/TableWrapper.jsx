import React from "react";
import Skeleton from "./Skeleton.jsx";

export default function TableWrapper({
  headers,
  data,
  loading,
  emptyMessage = "Tidak ada data",
  renderRow,
  columnsCount,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 font-semibold uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={columnsCount || headers.length} className="px-6 py-4">
                  <Skeleton className="h-6 w-full" />
                </td>
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columnsCount || headers.length} className="px-6 py-12 text-center">
                <div className="text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200 mx-auto max-w-sm py-6">
                  {emptyMessage}
                </div>
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
}
