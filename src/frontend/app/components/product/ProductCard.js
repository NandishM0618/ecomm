import { Rating } from "@mui/material";

export default function ProductCard({ product }) {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <>
            <Link
                href={`/product/${product._id}`}
                className="product-link block p-4 border w-[300px]  bg-slate-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <div className="flex items-center mb-2">
                    <Rating {...options} />
                    <span className="ml-2 text-sm text-gray-600">
                        ({product.numOfReviews} Reviews)
                    </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-red-500 font-bold">
                        {product.offerPrice > 0 ? `-${product.offerPrice}% off` : ""}
                    </h1>
                    <span className="text-lg font-bold text-gray-800">{` ₹${product.price}`}</span>
                </div>
                <div className="text-sm text-gray-600">Stock: {product.Stock}</div>
            </Link>
        </>
    );
};
