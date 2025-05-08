import React from "react";
import { useServices } from "../../../hooks/useServices";

const ServiceCatalog: React.FC = () => {
    const services = [
        { id: 1, name: "Servicio 1", description: "Descripción del servicio 1", price: 1000 },
        { id: 2, name: "Servicio 2", description: "Descripción del servicio 2", price: 2000 },
        { id: 3, name: "Servicio 3", description: "Descripción del servicio 3", price: 3990 },
    ]

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>${service.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceCatalog;

