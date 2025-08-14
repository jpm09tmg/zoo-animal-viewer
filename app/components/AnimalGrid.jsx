'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function AnimalGrid({ 
  animals, 
  loading, 
  user, 
  onDelete, 
  onEdit,
  searchTerm,
  onClearSearch 
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 text-xl mb-4">No animals found</p>
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          user={user}
          onDelete={() => onDelete(animal.id)}
          onEdit={(updatedData) => onEdit(animal.id, updatedData)}
        />
      ))}
    </div>
  );
}

function AnimalCard({ animal, user, onDelete, onEdit }) {
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: animal.name,
    category: animal.category,
    habitat: animal.habitat || '',
    imageUrl: animal.imageUrl || ''
  });

  const handleSaveEdit = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      name: animal.name,
      category: animal.category,
      habitat: animal.habitat || '',
      imageUrl: animal.imageUrl || ''
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue-300">
        <div className="p-6">
          <h3 className="font-bold text-lg mb-4 text-blue-600">Edit Animal</h3>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Animal Name"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            />
            
            <select
              value={editData.category}
              onChange={(e) => setEditData({...editData, category: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="mammals">Mammals</option>
              <option value="birds">Birds</option>
              <option value="reptiles">Reptiles</option>
              <option value="fish">Fish</option>
            </select>
            
            <input
              type="text"
              placeholder="Habitat"
              value={editData.habitat}
              onChange={(e) => setEditData({...editData, habitat: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            />
            
            <input
              type="text"
              placeholder="Image URL"
              value={editData.imageUrl}
              onChange={(e) => setEditData({...editData, imageUrl: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {!imageError && animal.imageUrl ? (
          <Image
            src={animal.imageUrl}
            alt={animal.name}
            width={400}
            height={192}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <span className="text-6xl">
              {animal.category === 'mammals' ? '🦁' : 
               animal.category === 'birds' ? '🦅' : 
               animal.category === 'reptiles' ? '🐍' :
               animal.category === 'fish' ? '🐠' : '🦎'}
            </span>
          </div>
        )}
        
        {/* Admin controls */}
        {user?.role === 'admin' && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            >
              ✏️
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{animal.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {animal.category}
          </span>
          {animal.habitat && (
            <span className="text-gray-500 text-sm">{animal.habitat}</span>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          Added {new Date(animal.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}