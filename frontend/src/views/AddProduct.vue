<template>
  <div class="flex flex-col items-center justify-between min-h-screen bg-[#242424] text-gray-50 pt-24">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mb-6">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-6">Add Product</h1>
      <form @submit.prevent="addProduct">
        <div class="mb-4">
          <label for="name" class="block text-lg font-semibold text-gray-700 mb-2 text-left">Name:</label>
          <input type="text" v-model="name" id="name"
            class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-lg font-semibold text-gray-700 mb-2 text-left">Description:</label>
          <input type="text" v-model="description" id="description"
            class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-lg font-semibold text-gray-700 mb-2 text-left">Price:</label>
          <input type="number" v-model="price" id="price" step="0.01"
            class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="mb-4">
          <label for="imageURL" class="block text-lg font-semibold text-gray-700 mb-2 text-left">Image URL:</label>
          <input type="text" v-model="imageURL" id="imageURL"
            class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <button type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4">
          Add Product
        </button>
        <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
      </form>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import Footer from './Footer.vue';
import { toast } from 'vue-sonner';

const router = useRouter();

const name = ref('');
const description = ref('');
const price = ref('');
const imageURL = ref('');
const errorMessage = ref('');

const addProduct = () => {
  if (!name.value || !description.value || !price.value || !imageURL.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  const newProduct = {
    name: name.value,
    description: description.value,
    price: price.value,
    imageURL: imageURL.value
  };

  fetch('http://localhost:5050/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMessage.value = data.message;
        toast.error("Failed to add product");
      } else {
        console.log('Product added:', data);
        name.value = '';
        description.value = '';
        price.value = '';
        imageURL.value = '';
        errorMessage.value = '';
        toast.success("Product Successfully added");
        router.push('/products');
      }
    })
    .catch(error => {
      console.error('Error adding product:', error);
      errorMessage.value = 'An error occurred. Please try again.';
    });
};
</script>