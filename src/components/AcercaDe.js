import React, { Component } from "react";

class AcercaDe extends Component {
    constructor() {
        super();
        this.state = {
            showHideFName: true,
            showHideLName: true
        };
        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent(name) {
        switch (name) {
            case "showHideFName":
                this.setState({ showHideFName: !this.state.showHideFName });
                break;
            case "showHideLName":
                this.setState({ showHideLName: !this.state.showHideLName });
                break;
        }
    }

    render() {
        const { showHideFName, showHideLName } = this.state;
        return (
            <div>
            <b><h2>Acerca de MyWays</h2></b>
                <br/>

                <p>My Ways es una aplicación para crear obras en formato multimedia (texto, audio, video e imagen) de forma colaborativa.</p>
                <p>nuestro objetivo es democratizar el acceso a la escritura,un lugar donde cualquier persona sin importar su raza, sexo, posición social, nivel socioecómico, educación , credo o color de piel puede ser parte de una obra colaborativa.</p>
<br/>
                <i><p>Agradecemos tus consultas o sugerencias directamente al correo contacto@myways.cl</p></i>
                <br/>

                <b><p>MyWays :: Democratizando la escritura</p></b>

            </div>
        );
    }
}

export default AcercaDe;
