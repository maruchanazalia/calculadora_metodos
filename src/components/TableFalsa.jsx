const TableFalsaPosicion = ({ iterations }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">I</th>
                    <th scope="col">a</th>
                    <th scope="col">b</th>
                    <th scope="col">f(a)</th>
                    <th scope="col">f(b)</th>
                    <th scope="col">p</th>
                    <th scope="col">f(p)</th>
                </tr>
            </thead>
            <tbody>
                {iterations.map((iteration, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{iteration["a"]}</td>
                        <td>{iteration["b"]}</td>
                        <td>{iteration["f(a)"]}</td>
                        <td>{iteration["f(b)"]}</td>
                        <td>{iteration["p"]}</td>
                        <td>{iteration["f(p)"]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableFalsaPosicion;
