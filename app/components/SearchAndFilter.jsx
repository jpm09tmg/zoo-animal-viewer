'use client';

export default function SearchAndFilter({ 
  searchTerm, 
  onSearchChange, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) {
  return (
    <div className="mb-8 flex gap-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search animals by name, category, or habitat..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-6 py-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
            selectedCategory === ''
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
          }`}
        >
          <span className="text-xl">🦎</span>
          <span className="font-medium">All Animals</span>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-6 py-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
              selectedCategory === category.name
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}