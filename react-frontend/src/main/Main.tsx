import React, { useEffect, useState } from "react";
import { Product } from "../admin/Interfaces/product";

const Main = () => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8001/api/products");
      const data = await res.json();

      setProducts(data);
    })();
  }, []);

  const like = async (id: number) => {
    await fetch(`http://localhost:8001/api/products/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    setProducts(
      products.map((p: Product) => {
        if (p.id === id) {
          p.likes++;
        }

        return p;
      })
    );
  };
  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {products.map((p: Product) => {
              return (
                <div className="col-md-4" key={p.id}>
                  <div className="card mb-4 shadow-sm">
                    <img src={p.image} height="180" />
                    <div className="card-body">
                      <p className="card-text">{p.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Like
                          </button>
                        </div>
                        <small className="text-muted">{p.likes} likes</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
