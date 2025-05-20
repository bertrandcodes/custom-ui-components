"use client";
import { useMemo, useState } from "react";
import products from "./products.json";
import "./CategoryPage.css";

/*
Requirements:
- render by categories
- tag filter
- show more items on click
- create on sale category

Components:
- CategoryPage - categoryObj, activeFilters
  - FilterTab
  - Category[] - showMore
    - ProductCard[]

State:
- categoryObj ({...category: products[]})
- activeFilters (set)
- showMore (boolean)

Plan:
- create categoryObj
- create UI
- create filter tag
- add show more on categories
*/

const TAGS = ["out-of-stock", "on-sale", "new-arrival"];

const CategoryPage = () => {
  const [activeTags, setActiveTags] = useState(new Set());
  const categoryObj = useMemo(() =>
    products.reduce((acc, product) => {
      acc["Sale"] ||= [];
      if (product.onSale) acc["Sale"].push(product);
      acc[product.category] ||= [];
      acc[product.category].push(product);
      return acc;
    }, {}),
  );
  return (
    <div className="category-page">
      <Tags activeTags={activeTags} setActiveTags={setActiveTags} />
      {Object.entries(categoryObj).map(([category, products]) => (
        <Category key={category} category={category} products={products} activeTags={activeTags} />
      ))}
    </div>
  );
};

const Tags = ({ activeTags, setActiveTags }) => {
  const handleTagClick = (tag) => {
    setActiveTags((prevTags) => {
      const newTags = new Set(prevTags);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };
  return (
    <div className="tags-container">
      {TAGS.map((tag) => (
        <div
          onClick={() => handleTagClick(tag)}
          key={tag}
          className={`tag ${activeTags.has(tag) ? "active" : ""}`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

const Category = ({ category, products, activeTags }) => {
  const [showAmount, setShowAmount] = useState(3);
  const handleShowMore = () => {
    setShowAmount(showAmount + 3);
  };
  const showButton = showAmount < products.length;
  return (
    <div className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="products-grid">
        {products
          .filter(({ tags }) => {
            if (activeTags.size === 0) return true;
            if (activeTags.size > 0 && tags.length === 0) return false;
            return [...activeTags].every((tag) => tags.includes(tag));
          })
          .slice(0, showAmount)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      {showButton && <button onClick={handleShowMore}>Show more</button>}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">
        ${product.price.toFixed(2)}
        {product.onSale && (
          <span className="sale-price"> - ${product.discountAmount.toFixed(2)} off</span>
        )}
      </p>
      {product.tags.map((tag) => (
        <p>{tag}</p>
      ))}
    </div>
  );
};

export default CategoryPage;
