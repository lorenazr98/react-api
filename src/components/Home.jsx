import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [gatos, setGatos] = useState([]);
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem("favoritos")
        return guardados ? JSON.parse(guardados) : []
    })
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setCargando(true);
        fetch('https://api.thecatapi.com/v1/images/search?limit=9')
            .then(response => response.json())
            .then(data => {
                setCargando(false);
                setGatos(data);
            }).catch(error => {
                setError("Error al cargar imágenes");
                setCargando(false);
            })
    }, [])



    function cargarMas() {
        setCargando(true);
        fetch('https://api.thecatapi.com/v1/images/search?limit=9')
            .then(response => response.json())
            .then(data => {
                setCargando(false);
                setGatos([...gatos, ...data]);
            }).catch(error => {
                setError("Error al cargar más imágenes");
                setCargando(false);
            }
        )
    }

    function agregarFavoritos(url) {
        if (!favoritos.includes(url)) {
            const nuevosFavoritos = [...favoritos, url];
            setFavoritos(nuevosFavoritos);
            localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
        } else {
            const nuevosFavoritos = favoritos.filter(fav => fav !== url);
            setFavoritos(nuevosFavoritos);
            localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
        }
    }

    return (
        <div>
            <div className="containerTitle">
                <h1 className="appTitle">Cat Gallery</h1>
                <Link to="/favoritos">Favoritos</Link>
            </div>
            {cargando && <p>Cargando...</p>}
            {error && <p>{error}</p>}

            {!cargando && !error && (
                <div className="container">
                    {gatos.map((gato, index) => (
                        <div className="containerCat" key={index}>
                            <img src={gato.url} alt="gato" />
                            <img 
                                src={favoritos.includes(gato.url) ? "src/assets/img/fav.png" : "src/assets/img/makeFav.png"} 
                                onClick={() => agregarFavoritos(gato.url)} />
                        </div>
                    ))}
                </div>
            )}
            {!cargando && !error && (
                <button onClick={cargarMas}>Ver más</button>
            )}
            
        </div>
    )
}

export default Home;