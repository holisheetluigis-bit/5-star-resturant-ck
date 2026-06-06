// Checkout Functions - Google Maps Integration

let map;
let marker;
let deliveryLatitude = null;
let deliveryLongitude = null;

function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    
    if (!mapContainer) return;

    // Default coordinates (Phnom Penh, Cambodia)
    const defaultLocation = { lat: 11.5564, lng: 104.9282 };

    map = new google.maps.Map(mapContainer, {
        zoom: 14,
        center: defaultLocation,
        mapTypeControl: true,
        fullscreenControl: true
    });

    // Add click listener to map
    map.addListener('click', (event) => {
        setDeliveryLocation(event.latLng.lat(), event.latLng.lng());
    });

    // Get user's current location if available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userLocation);
                setDeliveryLocation(userLocation.lat, userLocation.lng);
            },
            (error) => {
                console.log('Geolocation error:', error);
            }
        );
    }
}

function setDeliveryLocation(latitude, longitude) {
    deliveryLatitude = latitude;
    deliveryLongitude = longitude;

    // Remove old marker
    if (marker) {
        marker.setMap(null);
    }

    // Add new marker
    marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Delivery Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    // Center map on marker
    map.setCenter({ lat: latitude, lng: longitude });

    // Reverse geocode to get address
    reverseGeocode(latitude, longitude);
}

function reverseGeocode(lat, lng) {
    // Simple reverse geocoding (in production, use actual geocoding API)
    // This is a placeholder - actual implementation would call Google Geocoding API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                document.getElementById('deliveryStreet').value = address;
            }
        })
        .catch(error => console.log('Geocoding error:', error));
}

// Initialize map when checkout tab is opened
document.addEventListener('DOMContentLoaded', () => {
    // Wait for modal to be visible before initializing map
    const originalSwitchTab = switchCheckoutTab;
    window.switchCheckoutTab = function(tab) {
        originalSwitchTab(tab);
        if (tab === 'delivery') {
            setTimeout(() => {
                if (!map) {
                    initializeMap();
                }
            }, 100);
        }
    };
});

// Format address display
function formatAddress(street, city, zipcode) {
    return `${street}, ${city} ${zipcode}`;
}

// Calculate delivery fee based on location
async function calculateDeliveryFee(latitude, longitude) {
    try {
        const response = await fetch(`${API_URL}/cart/calculate-delivery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
        });

        const data = await response.json();
        return data.deliveryFee;
    } catch (error) {
        console.error('Error calculating delivery fee:', error);
        return 2.99; // Default fee
    }
}

// Store delivery location for order
function getDeliveryCoordinates() {
    return {
        latitude: deliveryLatitude,
        longitude: deliveryLongitude
    };
}
