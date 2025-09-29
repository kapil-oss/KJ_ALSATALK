// Demo product data with realistic categories and descriptions
const products = [
    {
        id: 1,
        name: "AeroPods Pro Max",
        description: "Premium wireless headphones with adaptive noise cancellation, spatial audio, and 40-hour battery life. Perfect for audiophiles and professionals.",
        price: 299.99,
        originalPrice: 349.99,
        category: "audio",
        rating: 4.8,
        reviews: 1247,
        emoji: "🎧",
        features: ["Noise Cancellation", "Spatial Audio", "40h Battery", "Quick Charge"],
        inStock: true,
        bestSeller: true
    },
    {
        id: 2,
        name: "FitTracker Elite",
        description: "Advanced fitness smartwatch with ECG monitoring, GPS tracking, sleep analysis, and 7-day battery life. Your perfect workout companion.",
        price: 249.99,
        originalPrice: null,
        category: "wearables",
        rating: 4.6,
        reviews: 892,
        emoji: "⌚",
        features: ["ECG Monitor", "GPS Tracking", "7-day Battery", "Water Resistant"],
        inStock: true,
        bestSeller: false
    },
    {
        id: 3,
        name: "PowerHub Ultra",
        description: "11-in-1 USB-C hub with dual 4K HDMI, Ethernet, SD card slots, and 100W power delivery. Essential for modern professionals.",
        price: 89.99,
        originalPrice: 119.99,
        category: "accessories",
        rating: 4.7,
        reviews: 643,
        emoji: "🔌",
        features: ["11-in-1 Design", "Dual 4K HDMI", "100W PD", "Ethernet Port"],
        inStock: true,
        bestSeller: false
    },
    {
        id: 4,
        name: "SonicBlast 360",
        description: "Waterproof portable speaker with 360° surround sound, LED light show, and 24-hour playtime. Perfect for parties and outdoor adventures.",
        price: 129.99,
        originalPrice: null,
        category: "audio",
        rating: 4.5,
        reviews: 1156,
        emoji: "🔊",
        features: ["360° Sound", "LED Light Show", "24h Playtime", "IPX7 Waterproof"],
        inStock: true,
        bestSeller: true
    },
    {
        id: 5,
        name: "ArmorShield Pro",
        description: "Military-grade phone case with wireless charging, drop protection up to 15ft, and built-in screen protector. Ultimate device protection.",
        price: 49.99,
        originalPrice: 69.99,
        category: "accessories",
        rating: 4.9,
        reviews: 2031,
        emoji: "📱",
        features: ["15ft Drop Protection", "Wireless Charging", "Screen Protector", "Military Grade"],
        inStock: true,
        bestSeller: false
    },
    {
        id: 6,
        name: "GamePad Elite",
        description: "Wireless gaming controller with customizable buttons, haptic feedback, and 40-hour battery. Compatible with PC, mobile, and console.",
        price: 79.99,
        originalPrice: null,
        category: "gaming",
        rating: 4.7,
        reviews: 756,
        emoji: "🎮",
        features: ["Customizable Buttons", "Haptic Feedback", "40h Battery", "Multi-Platform"],
        inStock: false,
        bestSeller: false
    },
    {
        id: 7,
        name: "ChargePod Wireless",
        description: "Fast wireless charging pad with cooling fan, LED indicator, and universal compatibility. Charges through most cases up to 5mm thick.",
        price: 39.99,
        originalPrice: 59.99,
        category: "accessories",
        rating: 4.4,
        reviews: 423,
        emoji: "🔋",
        features: ["Fast Charging", "Cooling Fan", "LED Indicator", "Case Compatible"],
        inStock: true,
        bestSeller: false
    },
    {
        id: 8,
        name: "StudyBeats Quiet",
        description: "Noise-cancelling earbuds designed for focus and productivity. Features study mode, ambient sound control, and 8-hour battery per charge.",
        price: 159.99,
        originalPrice: null,
        category: "audio",
        rating: 4.6,
        reviews: 334,
        emoji: "🎵",
        features: ["Study Mode", "Ambient Control", "8h Battery", "Noise Cancelling"],
        inStock: true,
        bestSeller: false
    }
];

// Shopping cart
let cart = [];

// Initialize ecommerce functionality
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    setupEventListeners();
});

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = `product-card ${!product.inStock ? 'out-of-stock' : ''}`;
    card.id = `product-${product.id}`;
    card.dataset.category = product.category;
    
    const originalPriceHtml = product.originalPrice ? 
        `<span class="original-price">$${product.originalPrice}</span>` : '';
    
    const discountBadge = product.originalPrice ? 
        `<div class="discount-badge">-${Math.round((1 - product.price/product.originalPrice) * 100)}%</div>` : '';
    
    const bestSellerBadge = product.bestSeller ? 
        `<div class="bestseller-badge">Best Seller</div>` : '';
        
    const stockStatus = product.inStock ? 
        '' : '<div class="stock-status">Out of Stock</div>';
    
    const rating = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    card.innerHTML = `
        <div class="product-image">
            ${product.emoji}
            ${discountBadge}
            ${bestSellerBadge}
            ${stockStatus}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-rating">
                <span class="stars">${rating}</span>
                <span class="rating-text">${product.rating} (${product.reviews})</span>
            </div>
            <div class="product-description">${product.description}</div>
            <div class="product-features">
                ${product.features.slice(0, 2).map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            <div class="product-pricing">
                ${originalPriceHtml}
                <span class="current-price">$${product.price}</span>
            </div>
            <button class="add-to-cart ${!product.inStock ? 'disabled' : ''}" 
                    onclick="addToCart(${product.id})" 
                    ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        
        // Send message to both AI agents about the cart addition
        const cartMessage = `User added ${product.name} to cart. Cart now has ${cart.length} unique items.`;
        
        if (window.aiAgent && window.aiAgent.isConnected) {
            window.aiAgent.sendCartUpdate(cartMessage);
        }
        
        if (window.salesAgent && window.salesAgent.isConnected) {
            window.salesAgent.sendCartUpdate(cartMessage);
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filter tabs functionality
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterProducts(filter);
            
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Category card navigation
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active filter tab
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`[data-filter="${category}"]`).classList.add('active');
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Hero CTA button
    document.querySelector('.cta-button')?.addEventListener('click', function() {
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('show'), 50);
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });
}

// Export functions for AI agent to use
window.ecommerce = {
    products,
    cart,
    addToCart,
    getCartTotal: () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    getCartItems: () => cart,
    clearCart: () => {
        cart = [];
        updateCartCount();
    },
    searchProducts: (query) => {
        const searchTerm = query.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    },
    getProductById: (id) => products.find(p => p.id === id),
    scrollToSection: (sectionId) => {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};