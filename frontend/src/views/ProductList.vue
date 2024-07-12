<template>
  <div class="flex flex-col items-center justify-between min-h-screen bg-[#242424] mt-1 mb-0 py-10">
    <div class="w-full max-w-5xl">
      <!-- Search input field -->
      <div class="md:flex flex-col md:flex-row items-center justify-between mb-10">
        <h1 class="text-4xl text-center font-bold text-gray-50 px-20 mb-5 md:mb-0">Product List</h1>
        <div class="">
          <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input v-model="searchTerm" type="search" placeholder="Search products..."
                class="w-full pl-8  md:w-[300px] lg:w-[350px] border-0 outline-none text-sm shadow-sm" />
            </div>
          </form>
        </div>
      </div>

      <h2 class="text-2xl text-center font-bold mb-10 text-gray-200">Welcome {{ username }}</h2>
      <div v-if="loading" class="text-center">
        <p>Loading products...</p>
      </div>
      <div v-else>
        <div v-if="products.length === 0" class="text-center text-gray-50">
          <p>No products available.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in filteredProducts" :key="product._id" :username="username" :product="product"
            @toggle-edit-mode="toggleEditMode(product)" @cancel-edit="cancelEdit(product)"
            @save-product="saveProduct(product)" @delete-product="deleteProduct(product._id)"
            @buy-product="buyProduct(product._id)" />
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
// import Footer from './Footer.vue';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-vue-next';
import { toast } from 'vue-sonner'

// Props
const props = defineProps({
  username: {
    type: String,
    required: true
  }
});

// State
const products = ref([]);
const loading = ref(true);
const searchTerm = ref('');

// Computed
const filteredProducts = computed(() => {
  if (!searchTerm.value.trim()) {
    return products.value;
  }
  const searchTermLower = searchTerm.value.trim().toLowerCase();
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchTermLower)
  );
});

// Methods
const fetchProducts = () => {
  fetch('http://localhost:5050/api/products')
    .then(response => response.json())
    .then(data => {
      products.value = data.map(product => ({
        ...product,
        editMode: false,
        updatedName: product.name,
        updatedDescription: product.description,
        updatedPrice: product.price,
        updatedImageURL: product.imageURL,
        errorMessage: ''
      }));
      loading.value = false;
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      loading.value = false;
    });
};

const toggleEditMode = (product) => {
  product.editMode = !product.editMode;
};

const cancelEdit = (product) => {
  product.editMode = false;
  product.updatedName = product.name;
  product.updatedDescription = product.description;
  product.updatedPrice = product.price;
  product.updatedImageURL = product.imageURL;
  toast.success("Edit Canceled Successfully"); //shad-cn
};

const saveProduct = (product) => {
  if (!product.updatedName || !product.updatedDescription || !product.updatedPrice || !product.updatedImageURL) {
    product.errorMessage = 'Please fill in all fields';
    return;
  }

  const updatedProduct = {
    name: product.updatedName,
    description: product.updatedDescription,
    price: product.updatedPrice,
    imageURL: product.updatedImageURL
  };

  fetch(`http://localhost:5050/api/products/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct)
  })
    .then(response => {
      if (response.ok) {
        toast.success("Product Successfully updated"); //shad-cn
        return response.json();
      }
      toast.error("Failed to update the product"); //shad-cn
      throw new Error('Failed to update product');
    })
    .then(data => {
      product.editMode = false;
      fetchProducts();
    })
    .catch(error => {
      console.error('Error updating product:', error);
      product.errorMessage = 'An error occurred. Please try again.';
    });
};

const deleteProduct = (productId) => {
  fetch(`http://localhost:5050/api/products/${productId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        toast.success("Product successfully deleted"); //shad-cn
        return response.json();
      }
      toast.error("Failed to delete the product"); //shad-cn
      throw new Error('Failed to delete product');
    })
    .then(data => {
      fetchProducts();
    })
    .catch(error => console.error('Error deleting product:', error));
};

const buyProduct = (productId) => {
  console.log(`Buying product with ID ${productId}`);
  // Implement buy logic here
};

// Lifecycle
onMounted(fetchProducts);
</script>

<style>
/* Add your styles here */
</style>
