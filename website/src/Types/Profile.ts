

import { User } from "./User";

export interface PaymentMethod {
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string;
    billingAddress: string;
}

// export type SubscriptionLevel = "free" | "individual" | "enterprise";

export interface Team {
    _id: string;
    name: string;
    leader: User;
    members: User[];
    plan: 'free' | 'pro' | 'enterprise';
    createdAt: string; // or Date
}

export interface Profile {
    _id: string; // MongoDB 的 ObjectId 通常在前端是 string 类型
    user: string; // 关联的 User ID（或你也可以拓展为 user 对象）
    paymentMethods: PaymentMethod[];
    teams: Team[];
}
