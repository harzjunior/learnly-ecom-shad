<template>
    <div class="text-center my-10">
        <h2 class="text-3xl font-bold mb-6">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            <div v-for="(product, index) in products" :key="index"
                class="rounded-lg shadow-md overflow-hidden bg-white transform hover:scale-105 transition-transform duration-300">
                <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
                    <p class="text-green-500 font-semibold">{{ `₦${product.price.toFixed(2)}` }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
