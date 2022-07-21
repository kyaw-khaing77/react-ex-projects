import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImage, setNewImage] = useState(false);

  const fetchImage = async () => {
    setLoading(true);
    console.log(query);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhoto) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhoto, ...data.results];
        } else {
          return [...oldPhoto, ...data];
        }
      });
      setLoading(false);
      setNewImage(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setNewImage(false);
    }
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line
  }, [page]);

  // useEffect(() => {
  //   const scrollEvent = window.addEventListener("scroll", () => {
  //     if (
  //       !loading &&
  //       window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  //     ) {
  //       // console.log(`innerHeight ${window.innerHeight}`);
  //       // console.log(`scrollY ${window.scrollY}`);
  //       // console.log(`body height ${document.body.scrollHeight}`);
  //       setPage((oldPage) => {
  //         return oldPage + 1;
  //       });
  //     }
  //   });

  //   return () => window.removeEventListener("scroll", scrollEvent);
  // }, []);

  const event = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
    ) {
      // console.log(`innerHeight ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);
      setNewImage(true);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImage) return;
    if (loading) return;
    setPage((oldPage) => {
      return oldPage + 1;
    });
  }, [newImage]);

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImage();
      return;
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input
            type="text"
            placeholder="search"
            value={query}
            className="form-input"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
