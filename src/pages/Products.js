import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
// Kiet code api
import axios from 'axios';
import * as React from 'react';
import CategoryCreateModal from 'src/sections/@dashboard/products/CategoryCreateModal';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Use api by Kiet and Dat
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get("http://localhost:8000/api/category");
      const { categories } = data.data;
      setCategories(categories);
    }
    fetchCategory();
  }, [categories])

  console.log(categories);

  return (

    <Page title="Dashboard: Products">
      <Container>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Category Management
        </Typography>
        <CategoryCreateModal /> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category Management
          </Typography>

          <CategoryCreateModal />
        </Stack>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            Don't use Filter
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}



        <ProductList products={categories} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
