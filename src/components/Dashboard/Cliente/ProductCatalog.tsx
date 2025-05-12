import React, { useState } from "react";
import { useProductos } from "./hooks/useProduct";

const ProductCatalog: React.FC = () => {
  const [filter, setFilter] = useState("");
  const { productos, loading, error } = useProductos();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar los productos: {error}</div>;

  const filteredProducts = productos?.filter(
    (product) =>
      product.name?.toLowerCase().includes(filter.toLowerCase()) ||
    product.description?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar producto por nombre o descripción"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          marginBottom: 16,
          padding: 6,
          borderRadius: 4,
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      {filteredProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No se encontraron productos.</div>
      )}
    </div>
  );
};

export default ProductCatalog;