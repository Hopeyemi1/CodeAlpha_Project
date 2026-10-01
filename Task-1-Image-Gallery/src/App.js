
import React, { useState, useEffect } from "react";
import "./App.css";

const images = [
  {
    id: 1,
    title: "Mountain Escape",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
  },
  {
    id: 3,
    title: "Ocean Dreams",
    category: "Ocean",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900",
  },
  {
    id: 4,
    title: "City Lights",
    category: "City",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900",
  },
  {
    id: 5,
    title: "Into the Woods",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
  },
  {
    id: 6,
    title: "Tropical Paradise",
    category: "Ocean",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
  },
  {
    id: 7,
    title: "Urban Stories",
    category: "City",
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900",
  },
  {
    id: 8,
    title: "Into the Wild",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900",
  },
  {
    id: 9,
    title: "Blue Horizon",
    category: "Ocean",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900",
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["All", "Nature", "Ocean", "City"];

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((image) => image.category === activeCategory);

  const showNext = () => {
    const index = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    setSelectedImage(filteredImages[(index + 1) % filteredImages.length]);
  };

  const showPrevious = () => {
    const index = filteredImages.findIndex(
      (image) => image.id === selectedImage.id
    );

    setSelectedImage(
      filteredImages[
        (index - 1 + filteredImages.length) % filteredImages.length
      ]
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return;

      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="gallery-page">
      <header className="navbar">
        <a href="#home" className="logo">
          FRAME<span>.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
        </nav>

        <a href="#gallery" className="nav-cta">
          Explore Gallery ↗
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              THE ART OF SEEING
            </span>

            <h1>
              Every picture
              <br />
              tells a <em>story.</em>
            </h1>

            <p>
              A curated collection of beautiful moments,
              places, and perspectives captured through
              the lens.
            </p>

            <a href="#gallery" className="hero-button">
              Discover the Gallery <span>↗</span>
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200"
              alt="Beautiful mountain lake surrounded by nature"
            />

            <div className="hero-image-label">
              <span>01 / 09</span>
              <span>Nature Collection</span>
            </div>
          </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE ↓</span>
            <span>EST. 2026</span>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>Visual <em>Journal.</em></h2>
            </div>

            <p>
              Moments worth keeping.
              <br />
              Stories worth seeing.
            </p>
          </div>

          <div className="filter-bar">
            <div className="filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? "filter active" : "filter"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="image-count">
              {filteredImages.length} PHOTOGRAPHS
            </span>
          </div>

          <div className="image-grid">
            {filteredImages.map((image, index) => (
              <button
                className={`image-card card-${index % 3}`}
                key={image.id}
                onClick={() => setSelectedImage(image)}
                aria-label={`View ${image.title}`}
              >
                <img src={image.src} alt={image.title} />

                <div className="card-overlay">
                  <span>{image.category}</span>
                  <h3>{image.title}</h3>
                  <span className="view-icon">↗</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">BEHIND THE LENS</span>

          <h2>
            Photography is
            <br />
            the art of <em>noticing.</em>
          </h2>

          <p>
            FRAME is a visual gallery dedicated to the beauty
            of everyday life, extraordinary landscapes, and
            the little moments in between.
          </p>

          <a href="#home" className="back-top">
            BACK TO TOP ↑
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          FRAME<span>.</span>
        </a>

        <p>© 2026 FRAME. CodeAlpha Internship Project.</p>

        <span>MADE WITH CREATIVITY.</span>
      </footer>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>

          <button
            className="lightbox-arrow left"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
            />

            <div className="lightbox-info">
              <div>
                <span>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>

              <span>
                {filteredImages.findIndex(
                  (image) => image.id === selectedImage.id
                ) + 1}{" "}
                / {filteredImages.length}
              </span>
            </div>
          </div>

          <button
            className="lightbox-arrow right"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default App;