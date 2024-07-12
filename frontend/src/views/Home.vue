<template>
  <div class="container mx-auto bg-[#242424] text-gray-50 pb-10">

    <!-- Hero Section -->
    <div class="mt-1 bg-cover bg-center h-96"
      style="background-image: url('https://assets-global.website-files.com/5f625f22a6be0f573da59f72/5f7cd0a92719b56db8a4099c_Wide_format1.jpg');">
      <div class="bg-black bg-opacity-70 h-full flex flex-col justify-center items-center">
        <h1 class="hero-title text-4xl font-bold text-white mb-4">Welcome to Our Learnly Store</h1>
        <p class="mt-4 text-xl text-white">Explore our amazing products!</p>
        <router-link to="/products" class="mt-8">
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Shop Now</button>
        </router-link>
        <router-link to="/market" class="mt-4">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View Our
            Collection</button>
        </router-link>
      </div>
    </div>

    <!-- Featured Products Section -->
    <div class="mt-10 relative overflow-hidden">
      <div class="carousel">
        <div class="carousel-track" :style="{ width: `${carouselWidth}px` }">
          <div v-for="(product, index) in carouselProducts" :key="index" class="carousel-item" @mouseover="stopCarousel"
            @mouseleave="startCarousel">
            <div class="relative transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img :src="product.image" :alt="product.name" class="rounded-lg shadow-lg square-image">
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2 px-4 text-center">
                <h3 class="text-white text-sm font-bold">{{ product.name }}</h3>
                <p class="text-gray-300 text-xs">{{ product.price.toLocaleString() }} NGN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <Testimonials :testimonials="testimonials" />

    <!-- Newsletter Signup Section -->
    <div class="mt-10 bg-cover bg-center py-10 text-center"
      style="background-image: url('https://e1.pxfuel.com/desktop-wallpaper/581/154/desktop-wallpaper-backgrounds-for-login-page-login-page.jpg');">
      <div class="bg-black bg-opacity-50 py-10">
        <h2 class="text-3xl font-bold text-white">Stay Updated</h2>
        <p class="mt-4 text-lg text-gray-200">Sign up for our newsletter to get the latest news and offers.</p>

        <form @submit.prevent="subscribe" class="mt-6 flex items-center justify-center">
          <input type="email" v-model="newsletterEmail" placeholder="Enter your email"
            class="px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500" required>
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-r-lg">Subscribe</button>
        </form>

        <p v-if="invalidEmail" class="text-red-500 mt-1">Please enter a valid email address.</p>
        <p v-if="subscribedSuccessfully" class="text-green-500 mt-1">Thank you for subscribing!</p>
        <div class="mt-4 text-sm text-gray-300">
          <input type="checkbox" class="mr-1" id="privacy-policy">
          <label for="privacy-policy">I agree to the <router-link to="/privacy-policy" class="underline">privacy
              policy</router-link>.</label>
        </div>
        <div class="mt-6">
          <p class="text-gray-300">Join thousands of subscribers who love our updates!</p>
        </div>
      </div>
    </div>

    <!-- Contact Information Section -->
    <ContactInfo />
  </div>
</template>

<script>
import FeaturedProducts from './FeaturedProducts.vue';
import Testimonials from './Testimonials.vue';
import ContactInfo from './ContactInfo.vue';

export default {
  components: {
    FeaturedProducts,
    Testimonials,
    ContactInfo
  },
  data() {
    return {
      featuredProducts: [
        { name: 'Damascus Kitten', price: 99000.99, image: 'https://i.etsystatic.com/42678828/r/il/b5bfb4/4878450308/il_600x600.4878450308_lfmv.jpg' },
        { name: 'Grandpa Street Style', price: 129000.99, image: 'https://img.freepik.com/premium-photo/image-cat-wearing-hoodie-generative-ai_97167-1329.jpg' },
        { name: 'Neo Era Designers', price: 79000.99, image: 'https://img.freepik.com/premium-photo/cute-cartoon-cat-character-generative-ai_570929-3968.jpg' },
      ],
      testimonials: [
        { text: 'Fast delivery and top-notch quality. Highly recommended!', author: 'Tunde Ola' },
        { text: 'Amazing store! Great products and excellent customer service.', author: 'Akinde Lolade' },
        { text: 'Fast delivery and top-notch quality. Highly recommended!', author: 'Acolyte Sasha' },
      ],
      newsletterEmail: '',
      invalidEmail: false,
      subscribedSuccessfully: false,
      carouselWidth: 0,
      carouselInterval: null
    };
  },
  computed: {
    carouselProducts() {
      return [...this.featuredProducts, ...this.featuredProducts, this.featuredProducts[0]]; // Duplicate products and add the first product
    }
  },
  mounted() {
    this.carouselWidth = this.carouselProducts.length * 200; // Adjust width based on items
    this.startCarousel();
  },
  methods: {
    subscribe() {
      if (!this.isValidEmail(this.newsletterEmail)) {
        this.invalidEmail = true;
        return;
      }
      alert(`Subscribed with ${this.newsletterEmail}`);
      this.subscribedSuccessfully = true;
      this.newsletterEmail = '';
      this.invalidEmail = false;
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    startCarousel() {
      const track = this.$el.querySelector('.carousel-track');
      let position = 0;

      this.carouselInterval = setInterval(() => {
        position -= 2;

        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
          track.style.transition = 'none'; // Disable transition for jump
          track.style.transform = `translateX(${position}px)`;
          void track.offsetWidth; // Force reflow
          track.style.transition = 'transform 0.5s linear'; // Re-enable transition
        } else {
          track.style.transform = `translateX(${position}px)`;
        }
      }, 100);
    },
    stopCarousel() {
      clearInterval(this.carouselInterval);
    }
  }
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s linear;
}

.carousel-item {
  flex: 0 0 200px;
  margin: 0 8px;
  position: relative;
}

.square-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.hero-title {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
