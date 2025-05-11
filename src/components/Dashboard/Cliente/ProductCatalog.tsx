import React, { useState } from "react";

const ProductCatalog: React.FC = () => {
  const [filter, setFilter] = useState("");
  const products = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1", price: 1000 },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2", price: 2000 },
    { id: 3, name: "Producto 3", description: "Descripción del producto 3", price: 3990 },
  ];
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar producto por nombre o descripción"
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
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCatalog;