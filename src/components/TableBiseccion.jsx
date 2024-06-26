const TableBiseccion = ({ iterations }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">I</th>
                    <th scope="col">a</th>
                    <th scope="col">b</th>
                    <th scope="col">p</th>
                    <th scope="col">f(p)</th>
                    
                </tr>
            </thead>
            <tbody>
                {iterations.map((iteration, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <th scope="row">{iteration["a"]}</th>
                        <th scope="row">{iteration["b"]}</th>
                        <th scope="row">{iteration["p"]}</th>
                        <th scope="row">{iteration["f(p)"]}</th>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableBiseccion;
