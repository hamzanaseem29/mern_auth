import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../utils";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://mern-auth-dun.vercel.app/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Welcome, {loggedInUser}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((e) => (
            <div key={e}>
              <div>
                <p>
                  {e.name} : {e.price}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
