'use client';
import { useState } from 'react';

export default function AdminPanel({ user, onAnimalAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    category: 'mammals',
    habitat: '',
    imageUrl: ''
  });

  const handleAddAnimal = async () => {
    if (!newAnimal.name.trim()) {
      alert('Please enter an animal name');
      return;
    }
    
    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAnimal,
          userRole: user.role
        })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Animal added successfully!');
        setNewAnimal({ name: '', category: 'mammals', habitat: '', imageUrl: '' });
        setShowForm(false);
        onAnimalAdded();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error adding animal');
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-yellow-800">Admin Panel</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Animal'}
        </button>
      </div>

      {showForm && (
        <div className="mt-6 p-6 bg-white rounded border grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Animal Name"
            value={newAnimal.name}
            onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})}
            className="px-4 py-3 border rounded-lg"
          />
          <select
            value={newAnimal.category}
            onChange={(e) => setNewAnimal({...newAnimal, category: e.target.value})}
            className="px-4 py-3 border rounded-lg"
          >
            <option value="mammals">Mammals</option>
            <option value="birds">Birds</option>
            <option value="reptiles">Reptiles</option>
            <option value="fish">Fish</option>
          </select>
          <input
            type="text"
            placeholder="Habitat"
            value={newAnimal.habitat}
            onChange={(e) => setNewAnimal({...newAnimal, habitat: e.target.value})}
            className="px-4 py-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newAnimal.imageUrl}
            onChange={(e) => setNewAnimal({...newAnimal, imageUrl: e.target.value})}
            className="px-4 py-3 border rounded-lg"
          />
          <button
            onClick={handleAddAnimal}
            className="col-span-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Add Animal
          </button>
        </div>
      )}
    </div>
  );
}