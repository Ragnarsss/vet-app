import React from "react";

const ProductCatalog: React.FC = () => {
  const products = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1", price: 1000 },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2", price: 2000 },
    { id: 3, name: "Producto 3", description: "Descripción del producto 3", price: 3990 },
  ];

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
          {products.map((product) => (
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