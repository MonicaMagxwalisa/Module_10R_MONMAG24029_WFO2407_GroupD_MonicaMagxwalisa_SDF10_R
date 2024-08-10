import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://mobile-app-5c389-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

// DOM Elements
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

// Add item to shopping list
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim();
    
    if (inputValue !== "") {
        push(shoppingListInDB, inputValue);
        clearInputFieldEl();
    }
});

// Listen for changes in the database
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearShoppingListEl();
        
        itemsArray.forEach(item => {
            appendItemToShoppingListEl(item);
        });
    } else {
        shoppingListEl.innerHTML = "<li class='text-center text-gray-500'>No items here... yet</li>";
    }
});

// Clear the shopping list
function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

// Clear the input field
function clearInputFieldEl() {
    inputFieldEl.value = "";
}

// Append an item to the shopping list
function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];
    
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.classList.add("bg-white", "px-4", "py-2", "rounded-lg", "shadow-sm", "hover:bg-yellow-100", "cursor-pointer");

    // Remove item on click
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    });
    
    shoppingListEl.append(newEl);
}
