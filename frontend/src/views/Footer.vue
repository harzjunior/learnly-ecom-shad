<template>
    <footer class="bg-gray-800 text-white py-8 mt-0 w-full">
        <div class="container mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- About Us Section -->
            <div>
                <h3 class="text-lg font-semibold mb-4">About Us</h3>
                <p>We are dedicated to providing the best products and services. Stay tuned for more updates.</p>
            </div>

            <!-- Quick Links Section -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                <ul class="space-y-2">
                    <li><router-link to="/" class="hover:underline">Home</router-link></li>
                    <li><router-link to="/products" class="hover:underline">Products</router-link></li>
                    <li><router-link to="/contact" class="hover:underline">Contact</router-link></li>
                </ul>
            </div>

            <!-- Contact Us Section -->
            <div>
                <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
                <p>Email: info@learnly_ecom.com</p>
                <p>Phone: (+234) 1230-7060-160</p>
                <p>Address: 1234 Street Name, F.C.T, Abuja City</p>
            </div>
        </div>
        <div class="mt-8 text-center border-t border-gray-700 pt-4">
            <p>&copy; 2024 learnly-ecom. All rights reserved.</p>
            <div class="flex justify-center space-x-4 mt-4">
                <a href="#">
                    <Facebook class="text-[#3b5998] hover:text-[#2d4373]" />
                </a>
                <a href="#">
                    <Twitter class="text-[#1da1f2] hover:text-[#0d95e8]" />
                </a>
                <a href="#">
                    <Instagram class="text-[#e1306c] hover:text-[#bc2a8d]" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import { Facebook, Twitter, Instagram } from 'lucide-vue-next';

export default {
    name: 'Footer',
    components: {
        Facebook,
        Twitter,
        Instagram
    }
};
</script>

<style scoped>
footer i {
    font-size: 1.25rem;
}
</style>