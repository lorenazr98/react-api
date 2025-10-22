import { useEffect, useState } from "react";

function Home() {

    const [gatos, setGatos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=9')
            .then(response => response.json())
            .then(data => {
                setGatos(data);
            })
    }, [])

    function cargarMas() {
        fetch('https://api.thecatapi.com/v1/images/search?limit=9')
            .then(response => response.json())
            .then(data => {
                setGatos([...gatos, ...data]);
            }
        )
    }

    return (
        <div>
            <div className="container">
                {gatos.map((gato, index) => (
                    <div className="containerCat">
                        <img key={index} src={gato.url} alt="gato" />
                        <img key={index} src="src/assets/img/makeFav.png"/>
                    </div>
                ))}
                <button onClick={cargarMas}>Ver más</button>
            </div>
        </div>
    )
}

export default Home;