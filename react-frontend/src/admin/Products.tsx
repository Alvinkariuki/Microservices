import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "./Interfaces/product";
import Wrapper from "./Wrapper";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/api/products");

      const data = await res.json();
      setProducts(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom mt-5">
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link
            to="/admin/products/create"
            className="btn btn-sm btn-outline-secondary"
          >
            Add
          </Link>
        </div>
      </div>
      <table className="table table-striped table-sm mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Likes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: Product) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img src={p.image} height="180" />
              </td>
              {/* eslint-disable-next-line */}
              <td>{p.title}</td>
              <td>{p.likes}</td>
              <td>
                <div className="btn-group mr-2">
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => del(p.id)}
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Products;
