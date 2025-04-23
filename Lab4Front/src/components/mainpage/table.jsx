import { useSelector } from "react-redux";

function Table() {
  const points = useSelector((state) => state.points.points); // Массив точек с полем isHit

  return (
    <table className="responsive-table highlight">
      <thead>
        <tr>
          <th>Результат</th>
          <th>x</th>
          <th>y</th>
          <th>r</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(points) &&
          points.map((point, index) => (
            <tr key={index}>
              <td>{point.isHit ? "Попал" : "Не попал"}</td> {/* Индивидуальный результат */}
              <td>{point.x}</td>
              <td>{point.y}</td>
              <td>{point.r}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export { Table };
