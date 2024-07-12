<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow product-card">
        <img :src="product.imageURL" alt="Product Image" class="w-full h-64 object-cover border-b" />
        <div class="p-4">
            <div v-if="username" class="flex items-center text-gray-500 my-2">
                <CircleUser class="size-5 text-stone-500" />
                <p class="pl-1">{{ username }}</p>
            </div>
            <h2 class="text-2xl text-center font-bold text-gray-800">{{ product.name }}</h2>
            <p class="text-gray-700 text-center mt-2">{{ product.description }}</p>
            <p class="text-green-500 text-center font-semibold mt-2">₦ {{ product.price }}</p>
            <div class="mt-4 flex justify-between">
                <!-- Edit and Delete buttons -->
                <AlertDialog v-if="username && !product.editMode">
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive" class="text-yellow-600 hover:text-yellow-700">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <FilePenLine />
                                    </TooltipTrigger>
                                    <TooltipContent class="bg-yellow-500">
                                        <p class="text-white">Edit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle class="text-green-600 font-bold">Confirm Edit</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will update the product information. Please ensure that all details are
                                correct before proceeding.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction @click="toggleEditMode">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <!-- Save button -->
                <AlertDialog v-if="username && product.editMode">
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive" class="text-blue-500 hover:text-blue-600">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Save />
                                    </TooltipTrigger>
                                    <TooltipContent class="bg-blue-500">
                                        <p class="text-white">Save</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle class="text-blue-600 font-bold">Confirm Save</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will update the product information. Please ensure that all details are
                                correct before proceeding.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction @click="saveProduct">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <!-- Cancel button -->
                <Button v-if="username && product.editMode" @click="cancelEdit" variant="destructive"
                    class="text-gray-500 hover:text-gray-600">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <X />
                            </TooltipTrigger>
                            <TooltipContent class="bg-gray-500">
                                <p class="text-white">Cancel</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Button>

                <!-- Delete button -->
                <AlertDialog v-if="username">
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive" class="text-red-400 hover:text-red-600">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Trash2 />
                                    </TooltipTrigger>
                                    <TooltipContent class="bg-red-500">
                                        <p class="text-white">Delete</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle class="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction @click="deleteProduct">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div v-if="product.editMode" class="mt-4">
                <label for="editName" class="block text-start text-lg font-semibold">Name:</label>
                <input type="text" v-model="product.updatedName" id="editName"
                    class="w-full text-gray-200 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <label for="editDescription" class="block text-start text-lg font-semibold mt-4">Description:</label>
                <input type="text" v-model="product.updatedDescription" id="editDescription"
                    class="w-full text-gray-200 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <label for="editPrice" class="block text-start text-lg font-semibold mt-4">Price:</label>
                <input type="number" v-model="product.updatedPrice" id="editPrice"
                    class="w-full text-gray-200 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <label for="editImageURL" class="block text-start text-lg font-semibold mt-4">Image URL:</label>
                <input type="text" v-model="product.updatedImageURL" id="editImageURL"
                    class="w-full text-gray-200 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <p v-if="product.errorMessage" class="mt-4 text-red-500 text-center">{{ product.errorMessage }}</p>
            </div>
        </div>
        <button v-if="!product.editMode" @click="buyProduct"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none mt-4 w-full">Sell</button>
    </div>
</template>

<script setup>
import { FilePenLine, Trash2, Save, CircleUser, X } from 'lucide-vue-next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ref } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    username: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['toggle-edit-mode', 'cancel-edit', 'save-product', 'delete-product', 'buy-product']);

const toggleEditMode = () => {
    emit('toggle-edit-mode');
};

const cancelEdit = () => {
    emit('cancel-edit');
};

const saveProduct = () => {
    emit('save-product');
};

const deleteProduct = () => {
    emit('delete-product');
};

const buyProduct = () => {
    emit('buy-product');
};
</script>

<style scoped>
.product-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
