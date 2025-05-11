import React, { useState } from "react";

const ServiceCatalog: React.FC = () => {
  const [filter, setFilter] = useState("");
  const services = [
    { id: 1, name: "Servicio 1", description: "Descripción del servicio 1", price: 1000 },
    { id: 2, name: "Servicio 2", description: "Descripción del servicio 2", price: 2000 },
    { id: 3, name: "Servicio 3", description: "Descripción del servicio 3", price: 3990 },
  ];
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(filter.toLowerCase()) ||
      service.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar servicio por nombre o descripción"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 16, padding: 6, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
      />
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
          {filteredServices.map((service) => (
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

