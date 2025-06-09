import React, { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Access to 1–2 limited tools",
      "Ad-supported",
      "Basic support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 29,
    priceYearly: 290, // 2 months free yearly pricing
    features: [
      "Full bundle access, no GPT-4",
      "Slower API limits",
      "Email support",
      "No ads",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 79,
    priceYearly: 790, // 2 months free yearly pricing
    features: [
      "Everything in Starter",
      "GPT-4 access",
      "Fast API limits",
      "Priority support",
      "No branding",
    ],
    recommended: true,
  },
];

function PriceTag({ price }) {
  if (price === 0) return <span className="text-green-600 font-bold">Free</span>;
  return <span className="text-gray-900 font-bold">${price}</span>;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly

  const toggleBilling = () =>
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6">Pricing Plans</h1>
      
      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10 space-x-4">
        <span className={billingCycle === "monthly" ? "font-bold" : "opacity-60"}>
          Monthly
        </span>
        <button
          onClick={toggleBilling}
          className="relative inline-flex items-center h-6 rounded-full w-12 bg-gray-300 focus:outline-none"
          aria-pressed={billingCycle === "yearly"}
          aria-label="Toggle billing cycle"
        >
          <span
            className={`transform transition-transform duration-300 ease-in-out inline-block w-5 h-5 bg-white rounded-full shadow ${
              billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className={billingCycle === "yearly" ? "font-bold" : "opacity-60"}>
          Yearly (Save 2 months)
        </span>
      </div>

      {/* Plans */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {plans.map(({ id, name, priceMonthly, priceYearly, features, recommended }) => (
          <div
            key={id}
            className={`border rounded-lg shadow-sm p-6 flex flex-col ${
              recommended ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{name}</h2>
            <div className="text-4xl mb-6">
              <PriceTag price={billingCycle === "monthly" ? priceMonthly : priceYearly} />
              <span className="text-lg text-gray-600"> / {billingCycle}</span>
            </div>
            <ul className="flex-1 mb-6 space-y-2 text-gray-700">
              {features.map((f, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => alert(`You selected the ${name} plan!`)}
              className={`w-full py-3 rounded-md text-white font-semibold transition ${
                recommended ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
