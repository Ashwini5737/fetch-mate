import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Chip,
} from '@mui/material';
import Tune from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import DogCard from '../../components/dogCard/DogCard';
import Paginator from '../../components/paginator/Paginator';
import ResultMatchDialog from '../../components/resultMatch/ResultMatchDialog';
import FavoritesDrawer from '../../components/favorites/FavoritesDrawer';
import FilterSidebar from '../../components/filterSidebar/FilterSidebar';
import StickyHeaderLayout from '../../components/stickyHeader/StickyHeader';
import { useUser } from '../../context/userContext';
import { DogAPI, AuthAPI } from '../../services';
import { Dog, FilterChip } from '../../types/dog';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    });
  const [matchDog, setMatchDog] = useState<Dog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextQuery, setNextQuery] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, setUser } = useUser();
  const [filtersReset, setFiltersReset] = useState(false);
  const [filterFormState, setFilterFormState] = useState({
    selectedBreed: '',
    ageMin: '',
    ageMax: '',
    zip: '',
  });
  const [appliedFilters, setAppliedFilters] = useState(filterFormState);
  const pageSize = 20;

  const fetchDogs = async (queryParams: Record<string, any> | string) => {
    setLoading(true);
    try {
      const res =
        typeof queryParams === 'string'
          ? await DogAPI.searchDogsRaw(queryParams)
          : await DogAPI.searchDogs(queryParams);
      if (!res.data.resultIds || res.data.resultIds.length === 0) {
        setDogs([]);
        setNextQuery(null);
        setPrevQuery(res.data.prev || null);
        return;
      }
      const detailRes = await DogAPI.fetchByIds(res.data.resultIds);
      setDogs(detailRes.data);
      
      if (detailRes.data.length < pageSize) {
        setNextQuery(null);
      } else {
        setNextQuery(res.data.next || null);
      }
      setPrevQuery(res.data.prev || null);
    } catch (e) {
      console.error('Error fetching dogs:', e);
      setDogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const breedRes = await DogAPI.getBreeds();
        setBreeds(breedRes.data);
      } catch (e) {
        console.error('Failed to load breeds:', e);
      }
    };
    loadInitial();
  }, []);

  useEffect(() => {
    handleApplyFilters();
  }, [filtersReset, sortOrder]);

  useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {
      sort: `breed:${sortOrder}`,
      size: pageSize,
    };

    if (filterFormState.selectedBreed) filters.breeds = [filterFormState.selectedBreed];
    if (filterFormState.zip) filters.zipCodes = [filterFormState.zip];
    if (filterFormState.ageMin) filters.ageMin = parseInt(filterFormState.ageMin);
    if (filterFormState.ageMax) filters.ageMax = parseInt(filterFormState.ageMax);
    setAppliedFilters({ ...filterFormState });
    fetchDogs(filters);
    setSidebarOpen(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handlePaginate = async (direction: 'next' | 'prev') => {
    const query = direction === 'next' ? nextQuery : prevQuery;
    if (!query) return;
    await fetchDogs(query);
  };

  const handleMatch = async () => {
    try {
      const matchRes = await DogAPI.matchDogs(favorites);
      const detail = await DogAPI.fetchByIds([matchRes.data.match]);
      setMatchDog(detail.data[0]);
    } catch {
      alert('Something went wrong while matching.');
    }
  };

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
    } catch (e) {
      console.error('Logout failed:', e);
    } finally {
      setFavorites([]);
      setDogs([]);
      setMatchDog(null);
      setDrawerOpen(false);
      setSidebarOpen(false);
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const activeFilterChips: FilterChip[] = [
    appliedFilters.selectedBreed
      ? { label: `Breed: ${appliedFilters.selectedBreed}`, key: 'selectedBreed' }
      : null,
    appliedFilters.zip
      ? { label: `Zip: ${appliedFilters.zip}`, key: 'zip' }
      : null,
    appliedFilters.ageMin
      ? { label: `Min Age: ${appliedFilters.ageMin}`, key: 'ageMin' }
      : null,
    appliedFilters.ageMax
      ? { label: `Max Age: ${appliedFilters.ageMax}`, key: 'ageMax' }
      : null,
  ].filter((chip): chip is FilterChip => chip !== null);

    useEffect(() => {
  if (activeFilterChips.length === 0) {
    handleApplyFilters();
  }
  }, [filtersReset, activeFilterChips.length]);



  return (
    <Box className="search-container">
      <StickyHeaderLayout
        onOpenFavorites={() => setDrawerOpen(true)}
        onMatch={handleMatch}
        favoriteCount={favorites.length}
        user={user ? { name: user.name, email: user.email } : { name: 'Guest', email: '' }}
        onLogout={handleLogout}
      />
      <Box>
      <Box className="filter-action-bar" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
        <Button startIcon={<Tune />} style={{color:`hotpink`}} onClick={() => setSidebarOpen(true)}>
          Filters
        </Button>
        <Button startIcon={<SortIcon />} 
          style={{color:`hotpink`}}
          onClick={() => {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }}>
          Sort ({sortOrder.toUpperCase()})
        </Button>
      </Box>
      <Box className="filter-chip-bar" sx={{ px: 2, py: 1, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        {activeFilterChips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={() => {
              setFilterFormState((prev) => ({ ...prev, [chip.key]: '' }));
              setAppliedFilters((prev) => ({ ...prev, [chip.key]: '' }));
              setFiltersReset((prev) => !prev);
            }}
          />
        ))}
      </Box>
      <FilterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        breedOptions={breeds}
        filterFormState={filterFormState}
        setFilterFormState={setFilterFormState}
        onApply={handleApplyFilters}
        onClear={() => {
          setSortOrder('asc');
          setFilterFormState({
            selectedBreed: '',
            ageMin: '',
            ageMax: '',
            zip: '',
          });
          setFiltersReset((prev) => !prev);
          setSidebarOpen(false);
        }}
      />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : dogs.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
          No dogs found. Try another breed or search term!
        </Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2} px={2}>
          {dogs.map((dog) => (
            <Box key={dog.id}>
              <DogCard
                dog={dog}
                favorited={favorites.includes(dog.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Box>
          ))}
        </Box>
      )}

      <Paginator
        hasNext={!!nextQuery}
        hasPrev={!!prevQuery}
        onPaginate={handlePaginate}
      />

      <FavoritesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onToggleFavorite={toggleFavorite}
        dogs={dogs.filter((d) => favorites.includes(d.id))}
        onMatch={handleMatch}
        onClearFavorites={() => setFavorites([])}
      />

      <ResultMatchDialog
        open={!!matchDog}
        dog={matchDog}
        onClose={() => setMatchDog(null)}
      />
    </Box>
  );
};

export default SearchPage;
