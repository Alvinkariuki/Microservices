import React, {
  PropsWithRef,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Redirect } from "react-router";
import { Product } from "./Interfaces/product";
import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:8000/api/products/${props.match.params.id}`
      );
      const product: Product = await res.json();
      setTitle(product.title);
      setImage(product.image);
    })();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/api/products/${props.match.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image }),
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/admin/products" />;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-5">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductsEdit;
