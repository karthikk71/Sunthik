function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 my-6 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-yellow-400 text-black shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-yellow-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;