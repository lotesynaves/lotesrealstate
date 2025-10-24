import { useState } from 'react';
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (params: { location: string; category: string; operation: string }) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function SearchBar({ onSearch, onClearFilters, className = '' }: SearchBarProps) {
  const [searchParams, setSearchParams] = useState({
    location: '',
    category: '',
    operation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClearInput = () => {
    setSearchParams(prev => ({
      ...prev,
      location: ''
    }));
  };

  const handleClearAll = () => {
    setSearchParams({
      location: '',
      category: '',
      operation: ''
    });
    onClearFilters();
  };

  const hasFilters = searchParams.location || searchParams.category || searchParams.operation;

  return (
   // Update the main container classes
<div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-colors duration-200 w-full max-w-4xl mx-auto ${className}`}>
  <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
    Buscar Propiedades
  </h3>
  <form onSubmit={handleSubmit} className="w-full">
    <div className="flex flex-col items-center w-full">
      {/* Search input container */}
      <div className="w-full max-w-2xl">
        <div className="relative">
          <Input
            name="location"
            placeholder="Ubicación..."
            className="w-full pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            value={searchParams.location}
            onChange={handleInputChange}
            data-testid="input-location"
          />
          {searchParams.location && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Button container */}
      <div className="mt-4 w-full max-w-xs">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
          data-testid="button-submit-search"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  </form>
</div>
  );
}
