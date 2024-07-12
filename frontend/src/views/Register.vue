<!-- frontend/src/views/Register.vue -->
<template>
  <div class="flex flex-col items-center justify-between min-h-screen bg-[#242424] text-gray-50 mt-1 -mb-5 pt-1">
    <!-- Register -->
    <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <!-- Left Section: Form -->
      <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-[350px] gap-6">
          <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">Register</h1>
            <p class="text-balance text-muted-foreground text-gray-300">Create your account</p>
          </div>
          <!-- Form -->
          <form @submit.prevent="register">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <label for="username" class="block text-lg font-semibold text-gray-300 mb-2 text-left">Username</label>
                <input type="text" id="username" v-model="username"
                  class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>
              <div class="grid gap-2">
                <label for="email" class="block text-lg font-semibold text-gray-300 mb-2 text-left">Email</label>
                <input type="email" id="email" v-model="email"
                  class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>
              <div class="grid gap-2">
                <label for="password" class="block text-lg font-semibold text-gray-300 mb-2 text-left">Password</label>
                <input type="password" id="password" v-model="password"
                  class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>
              <button type="submit"
                class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4">Register</button>
              <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
            </div>
          </form>
          <div class="mt-4 text-center text-sm">
            Already have an account? <router-link to="/login" class="underline">Login</router-link>
          </div>
        </div>
      </div>
      <!-- Right Section: Image -->
       <div class="relative hidden lg:block overflow-hidden">
        <img src="https://wallpapercave.com/wp/wp7969113.jpg" alt="Image" class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-8">
          <h2 class="text-5xl font-extrabold mb-4 animate-pulse">Join Us Today!</h2>
          <p class="text-lg mb-4 animate-fade-in">Become a member and enjoy exclusive benefits.</p>
          <p class="text-md">Already have an account? Login and explore more!</p>
          <router-link to="/login" class="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</router-link>
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from './Footer.vue';
import { toast } from 'vue-sonner';

export default {
  components: {
    // Footer
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      if (!this.username || !this.email || !this.password) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      fetch('http://localhost:5050/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.errorMessage = data.message;
          } else {
            toast.success("Successfully registered");
            this.username = '';
            this.email = '';
            this.password = '';
            this.errorMessage = '';
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.error('Error registering user:', error);
          this.errorMessage = 'An error occurred. Please try again.';
        });
    }
  }
};
</script>
