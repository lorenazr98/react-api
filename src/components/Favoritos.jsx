import { Link } from "react-router-dom";
import { useState } from "react";

function Favoritos() {

    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem("favoritos")
        return guardados ? JSON.parse(guardados) : []
    })

    function eliminarFavoritos(url) {
        const nuevosFavoritos = favoritos.filter(fav => fav !== url);
        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    }

    return (
        <div>
            <Link to="/">Volver atrás</Link>
            <h1>Favoritos</h1>
            <div className="containerFavs">
              {favoritos.map((url, index) => (
                    <div className="containerCat" key={index}>
                        <img src={url} alt="gato" />
                        <img 
                            src="img/fav.png"
                            onClick={() => eliminarFavoritos(url)} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Favoritos;