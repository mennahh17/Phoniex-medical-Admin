"use client";
import { useState, useEffect } from "react";

type Order = {
    id: number;
    status: string;
    items: OrderItem[];
    userId: string;
    totalPrice: number;
    firstName: string;
    lastName: string;
    phone: string;
    deliveryAddress: string;
    createdAt: string;
    updatedAt: string;
};

type OrderItem = {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
};

export default function order() {
    const [activeTab, setActiveTab] = useState("Orders");
    const [orders , setOrders] =useState<Order[]>([]);

    useEffect (() => {
        async function fetchOrders() {
            const response = await fetch ("http://localhost:3000/orders/all", { 
                method : "GET" , 
                credentials : "include" , 
            });
            if (response.ok){
                const data = await response.json ();
                setOrders(data);
            }
    }
    fetchOrders();
    },[]);

    async function handleConfirm (id : number ) {
        const response = await fetch (`http://localhost:3000/orders/${id}/status` , {
            method : "PATCH" , 
            credentials : "include", 
        
        headers : {
            "Content-Type" : "application/json",
        },
        body :JSON.stringify ({status : "confirmed"}),
        });
        setOrders((prev) =>
            prev.map((order) => 
                order.id===id ? {...order , status : "confirmed"}  : order
    )
);
}
    

    return (
        <main>
            <div className="text-blue-900 font-oleo-script flex justify-center items-center text-[60px] py-10 font-bold">
                Orders
            </div>
            <div className="flex justify-center items-center gap-10 rounded-2xl shadow-2xl bg-blue-900 py-5">
                <div
                    className="font-bold text-2xl hover:bg-white hover:text-blue-900 cursor-pointer px-5 rounded-2xl"
                    onClick={() => setActiveTab("Orders")}
                >
                    Orders
                </div>
                <div
                    className="font-bold text-2xl hover:bg-white hover:text-blue-900 rounded-2xl cursor-pointer px-6"
                    onClick={() => setActiveTab("Equipments")}
                >
                    Equipments
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-4">
                {orders.map((order) => (
                    <div className="rounded-2xl shadow-2xl bg-white text-blue-900 p-10"
                        key={order.id}>
                        <div> {order.status}</div>
                        <div>{order.firstName}</div>
                        <div>{order.lastName}</div>

                            <div className="flex justify-center items-center gap-8">
                            <button 
                            onClick ={() => handleConfirm(order.id)}
                            className="font-bold bg-blue-900 text-white rounded-2xl shadow-2xl px-5 py-2 hover:bg-blue-800 transition-colors">
                            Order Confirmed
                            </button>

                            <button
                            className="font-bold bg-blue-900 text-white rounded-2xl shadow-2xl px-5 py-2 hover:bg-blue-800 transition-colors"
                            >
                            Processing
                            </button>

                            <button
                            className="font-bold bg-blue-900 text-white rounded-2xl shadow-2xl px-5 py-2 hover:bg-blue-800 transition-colors"
                            >
                            Shipped
                            </button>

                            <button
                            className="font-bold bg-blue-900 text-white rounded-2xl shadow-2xl px-5 py-2 hover:bg-blue-800 transition-colors"
                            >
                            Delivered
                            </button>

                            </div>

                    </div>
                ))}
            </div>
        </main>
    );
}