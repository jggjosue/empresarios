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
    savedCoupons: Coupon[];
    addCoupon: (coupon: Coupon) => void;
    removeCoupon: (promotionId: number) => void;
    isLiked: (promotionId: number) => boolean;
}

export const useCouponStore = create<CouponState>()(
    persist(
        (set, get) => ({
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
            }
        }),
        {
            name: 'saved-coupons-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
