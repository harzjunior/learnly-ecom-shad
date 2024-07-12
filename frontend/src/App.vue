<template>
  <div id="app" class="text-end max-w-screen-xl mx-auto">
    <nav
      class="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-gray-50 px-10 py-4 shadow-lg">
      <div>
        <h1>
          <router-link to="/">
            <img src="./assets/logo.png" alt="logo" class="w-auto h-14 object-cover py-1">
          </router-link>
        </h1>
      </div>
      <div class="flex items-center text-lg gap-4 cursor-pointer">
        <router-link to="/" class="hover:text-blue-300">Home</router-link>
        <router-link to="/market" class="hover:text-blue-300">Market</router-link>
        <router-link to="/products" class="hover:text-blue-300">Products</router-link>
        <router-link to="/add-product" v-if="username" class="hover:text-blue-300">Add Product</router-link>
        <router-link to="/login" v-if="!username" class="hover:text-blue-300">Login</router-link>
        <router-link to="/register" v-if="!username" class="hover:text-blue-300">Register</router-link>
        <button v-if="username" @click="logout">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger class="flex">
                <LogOut class="rounded-r-full bg-gradient-to-l from-black to-blue-600 transition" />
              </TooltipTrigger>
              <TooltipContent class="bg-red-500 border-none text-white font-bold">
                <p class="">Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
      </div>
    </nav>
    <router-view :username="username" />
    <Toaster richColors />
    <Footer />
  </div>
</template>

<script>
import { Toaster } from '@/components/ui/sonner';
import Footer from './views/Footer.vue';
import { Search, LogOut } from 'lucide-vue-next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'vue-sonner'


export default {
  components: {
    Toaster,
    Footer,
    LogOut,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
  },
  data() {
    return {
      username: localStorage.getItem('username') || null,
    };
  },
  methods: {
    logout() {
      toast.success("Logged Out Successfully"); //shad-cn
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.username = null;
      this.$router.push('/market');
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
