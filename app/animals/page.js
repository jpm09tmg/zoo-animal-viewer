'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import SearchAndFilter from '../components/SearchAndFilter';
import AdminPanel from '../components/AdminPanel';
import AnimalGrid from '../components/AnimalGrid';
import Footer from '../components/Footer';

export default function AnimalsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [animalsLoading, setAnimalsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const loadAnimals = useCallback(async () => {
    setAnimalsLoading(true);
    try {
      const response = await fetch(`/api/animals?category=${selectedCategory}&search=${searchTerm}`);
      const result = await response.json();
      if (result.success) {
        setAnimals(result.animals);
      }
    } catch (error) {
      console.error('Error loading animals:', error);
    } finally {
      setAnimalsLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const result = await response.json();
      if (result.success) {
        setCategories(result.categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadAnimals();
    }
  }, [selectedCategory, searchTerm, user, loadAnimals]);

  useEffect(() => {
    if (user) {
      loadCategories();
    }
  }, [user]);

  const handleDeleteAnimal = async (animalId) => {
    if (!window.confirm('Are you sure you want to delete this animal?')) return;
    
    try {
      const response = await fetch(`/api/animals/${animalId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRole: user?.role })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Animal deleted successfully!');
        loadAnimals();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error deleting animal');
    }
  };

  const handleEditAnimal = async (animalId, updatedData) => {
    try {
      const response = await fetch(`/api/animals/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedData,
          userRole: user?.role
        })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Animal updated successfully!');
        loadAnimals();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error updating animal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={logout} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {user?.role === 'admin' && (
          <AdminPanel user={user} onAnimalAdded={loadAnimals} />
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {selectedCategory ? 
              `${categories.find(c => c.name === selectedCategory)?.displayName || selectedCategory}` : 
              'All Animals'
            }
            <span className="text-lg text-gray-500 ml-2">({animals.length})</span>
          </h2>
        </div>

        <AnimalGrid
          animals={animals}
          loading={animalsLoading}
          user={user}
          onDelete={handleDeleteAnimal}
          onEdit={handleEditAnimal}
          searchTerm={searchTerm}
          onClearSearch={() => setSearchTerm('')}
        />
      </main>

      <Footer />
    </div>
  );
}