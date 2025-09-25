import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Coupon {
    promotionId: number;
    title: string;
    description: string;
    advertiser: {
        id: number;
        name: string;
    };
    voucher: {
        code: string;
    };
    urlTracking: string;
    image?: string;
}

interface CouponState {
    // State for saved coupons (persisted)
    savedCoupons: Coupon[];
    addCoupon: (coupon: Coupon) => void;
    removeCoupon: (promotionId: number) => void;
    isLiked: (promotionId: number) => boolean;

    // State for current promotions (session-only)
    promotions: Coupon[];
    loading: boolean;
    getPromotions: (regionCode?: string) => Promise<void>;
}

const CACHE_DURATION = 3600 * 1000; // 1 hour

export const useCouponStore = create<CouponState>()(
    persist(
        (set, get) => ({
            // --- Persisted State ---
            savedCoupons: [],
            addCoupon: (coupon) => {
                if (!get().savedCoupons.some(c => c.promotionId === coupon.promotionId)) {
                    set((state) => ({ savedCoupons: [...state.savedCoupons, coupon] }));
                }
            },
            removeCoupon: (promotionId) => {
                set((state) => ({
                    savedCoupons: state.savedCoupons.filter(c => c.promotionId !== promotionId),
                }));
            },
            isLiked: (promotionId) => {
                return get().savedCoupons.some(c => c.promotionId === promotionId);
            },

            // --- Session State (Not Persisted) ---
            promotions: [],
            loading: true,
            getPromotions: async (regionCode = '') => {
                set({ loading: true });
                const cacheKey = `promotions-cache-${regionCode || 'all'}`;

                // Try to load from cache first
                try {
                    const cachedItem = localStorage.getItem(cacheKey);
                    if (cachedItem) {
                        const { timestamp, data } = JSON.parse(cachedItem);
                        if (Date.now() - timestamp < CACHE_DURATION) {
                            console.log(`Loading from cache for region: ${regionCode || 'all'}`);
                            set({ promotions: data, loading: false });
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error reading from cache", error);
                }

                // If cache is invalid or doesn't exist, fetch from API
                try {
                    console.log(`Fetching from API for region: ${regionCode || 'all'}`);
                    const response = await fetch('/api/promotions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ regionCode }),
                    });

                    if (!response.ok) {
                        throw new Error("Error al obtener las promociones");
                    }

                    const responseData = await response.json();
                    const productsData = responseData.data || [];
                    set({ promotions: productsData });

                    // Save new data to cache
                    try {
                        const cacheData = {
                            timestamp: Date.now(),
                            data: productsData
                        };
                        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                    } catch (error) {
                        console.error("Error saving to cache", error);
                    }

                } catch (error) {
                    console.error(error);
                    set({ promotions: [] });
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'saved-coupons-storage', // Name for the persisted storage
            storage: createJSONStorage(() => localStorage),
            // Only persist the 'savedCoupons' part of the state
            partialize: (state) => ({ savedCoupons: state.savedCoupons }),
        }
    )
);
