import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import Layout from "../components/layout/Layout";
import PerfumeCard from "../components/perfume/PerfumeCard";
import { perfumes, scentFamilies } from "../data/perfumes";
import { Perfume } from "../types";
import { Button } from "../components/ui/button";

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedPerfumes, setDisplayedPerfumes] = useState<Perfume[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get filter parameters
  const filterType = searchParams.get("filter");
  const scentFamily = searchParams.get("scentFamily");
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const sortBy = searchParams.get("sort") || "featured";

  useEffect(() => {
    // Apply filters
    let filteredPerfumes = [...perfumes];

    // Filter by type (new, bestsellers)
    if (filterType === "new") {
      filteredPerfumes = filteredPerfumes.filter(perfume => perfume.isNew);
    } else if (filterType === "bestsellers") {
      filteredPerfumes = filteredPerfumes.filter(perfume => perfume.isBestseller);
    }

    // Filter by scent family
    if (scentFamily) {
      filteredPerfumes = filteredPerfumes.filter(perfume => perfume.scentFamily === scentFamily);
    }

    // Filter by price range
    if (minPrice !== undefined) {
      filteredPerfumes = filteredPerfumes.filter(perfume => perfume.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredPerfumes = filteredPerfumes.filter(perfume => perfume.price <= maxPrice);
    }

    // Apply sorting
    if (sortBy === "price_asc") {
      filteredPerfumes.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filteredPerfumes.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name_asc") {
      filteredPerfumes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      filteredPerfumes.sort((a, b) => b.name.localeCompare(a.name));
    }
    // If sortBy is "featured" (default), we don't need to sort

    setDisplayedPerfumes(filteredPerfumes);
  }, [filterType, scentFamily, minPrice, maxPrice, sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", e.target.value);
    setSearchParams(newParams);
  };

  const handleScentFamilyChange = (familyId: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (scentFamily === familyId) {
      // If this family is already selected, remove the filter
      newParams.delete("scentFamily");
    } else {
      // Otherwise set it
      newParams.set("scentFamily", familyId);
    }
    
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (sortBy !== "featured") {
      newParams.set("sort", sortBy);
    }
    setSearchParams(newParams);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <Layout>
      <div className="page-transition">
        <div className="luxury-container py-12">
          <div className="mb-10">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-purple mb-2">
              {filterType === "new"
                ? "New Arrivals"
                : filterType === "bestsellers"
                ? "Bestsellers"
                : "Fragrance Collection"}
            </h1>
            <p className="text-luxury-muted">
              {filterType === "new"
                ? "Discover our latest additions to the fragrance collection."
                : filterType === "bestsellers"
                ? "Our most loved and sought-after fragrances."
                : "Explore our curated selection of luxury fragrances."}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={toggleMobileFilter}
                variant="outline"
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Sidebar Filters */}
            <div
              className={`w-full lg:w-1/4 xl:w-1/5 transition-all ${
                isMobileFilterOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  {(scentFamily || minPrice || maxPrice) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-luxury-purple hover:text-luxury-accent"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Scent Family Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Scent Family</h4>
                  <div className="space-y-2">
                    {scentFamilies.map((family) => (
                      <label
                        key={family.id}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={scentFamily === family.id}
                          onChange={() => handleScentFamilyChange(family.id)}
                          className="rounded border-luxury-muted/60 text-luxury-purple focus:ring-luxury-purple"
                        />
                        <span className="ml-2">
                          {family.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter - Could be implemented with a range slider */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  {/* Simple price range inputs could go here */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="input-luxury text-sm py-1.5 flex-1"
                      value={minPrice || ""}
                      onChange={(e) => {
                        const newParams = new URLSearchParams(searchParams);
                        if (e.target.value) {
                          newParams.set("minPrice", e.target.value);
                        } else {
                          newParams.delete("minPrice");
                        }
                        setSearchParams(newParams);
                      }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="input-luxury text-sm py-1.5 flex-1"
                      value={maxPrice || ""}
                      onChange={(e) => {
                        const newParams = new URLSearchParams(searchParams);
                        if (e.target.value) {
                          newParams.set("maxPrice", e.target.value);
                        } else {
                          newParams.delete("maxPrice");
                        }
                        setSearchParams(newParams);
                      }}
                    />
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <h4 className="font-medium mb-3">Availability</h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-luxury-muted/60 text-luxury-purple focus:ring-luxury-purple"
                    />
                    <span className="ml-2">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Product Listing */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="mb-4 sm:mb-0">
                  <p className="text-luxury-muted">
                    Showing {displayedPerfumes.length} {displayedPerfumes.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-sm">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="input-luxury text-sm py-1.5"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {displayedPerfumes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPerfumes.map((perfume) => (
                    <PerfumeCard key={perfume.id} perfume={perfume} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No Perfumes Found</h3>
                  <p className="text-luxury-muted mb-6">
                    We couldn't find any perfumes matching your selected filters.
                  </p>
                  <Button onClick={clearAllFilters} className="bg-luxury-purple hover:bg-luxury-purple/90">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;
