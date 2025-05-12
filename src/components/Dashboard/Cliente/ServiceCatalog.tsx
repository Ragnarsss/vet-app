import React, { useState } from "react";
import { useService } from "./hooks/useService";

const ServiceCatalog: React.FC = () => {
  const [filter, setFilter] = useState("");
  const { services, loading, error } = useService();

  if (loading) return <div>Cargando servicios...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id}>
          
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

