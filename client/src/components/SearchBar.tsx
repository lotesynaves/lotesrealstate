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
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-colors duration-200 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Buscar Propiedades</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 relative">
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
          <div>
            <Select
              value={searchParams.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" data-testid="select-category">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectItem value="Naves Industriales">Naves Industriales</SelectItem>
                <SelectItem value="Casas">Casas</SelectItem>
                <SelectItem value="Locales Comerciales">Locales Comerciales</SelectItem>
                <SelectItem value="Oficinas">Oficinas</SelectItem>
                <SelectItem value="Terrenos">Terrenos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={searchParams.operation}
              onValueChange={(value) => handleSelectChange('operation', value)}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" data-testid="select-operation">
                <SelectValue placeholder="Operación" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectItem value="venta">Venta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              data-testid="button-submit-search"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            {hasFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearAll}
                className="flex-1 md:flex-none border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            )}

          </div>
        </div>
      </form>
    </div>
  );
}
