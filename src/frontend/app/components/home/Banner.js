"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import Slider from "react-slick";
import ProductCard from "../product/ProductCard";
import Category from "./Category";
import Loading from "../../elements/Loading";
import MetaData from "../../elements/Metadata";
import { NextArrow, PrevArrow } from "../../elements/Controls";

import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import banner from "../../../public/images/home-banner.jpg";   // 👈 Correct import

export default function Banner() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <>
            <MetaData title="Home" />

            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Banner section */}
                    <div className="relative w-full h-screen">
                        <Image
                            src={banner}
                            alt="banner"
                            fill
                            priority
                            className="object-cover"
                        />

                        <div className="absolute inset-0 top-8 flex justify-center items-center text-white">
                            <div className="right-16 text-left text-xl top-32 leading-relaxed absolute mb-3 max-w-lg">
                                <div className="mb-4 font-serif font-semibold text-7xl text-black">
                                    50% Off
                                </div>
                                <span className="mb-2 text-3xl font-extralight text-black">
                                    Top Brands On Offer Price*
                                </span>
                                <p className="text-black mt-2">
                                    Shop online for mobiles, books, watches, shoes and more at Shopio.
                                    Best offers on fashion, electronics, furniture and more.
                                </p>

                                <div className="relative mt-4">
                                    <Link href="/products">
                                        <button className="border-2 p-3 border-white font-bold relative overflow-hidden group text-black">
                                            <span className="relative z-10">Shop now</span>
                                            <div className="absolute inset-0 bg-white transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0"></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <Category />

                    {/* Popular Products */}
                    <div className="max-w-7xl mx-auto pt-10">
                        <h2 className="text-2xl font-medium w-1/4 border-b-2 text-gray-800 p-2 py-4">
                            Popular Products
                        </h2>

                        <div className="pt-10">
                            {products.length > 0 ? (
                                <Slider {...settings}>
                                    {products
                                        .filter((product) => product.category === "electronics")
                                        .map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                </Slider>
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                    </div>

                    {/* Featured Products */}
                    <div className="max-w-7xl mx-auto pt-10">
                        <h2 className="text-2xl font-medium w-1/4 border-b-2 text-gray-800 p-2 py-4">
                            Featured Products
                        </h2>

                        <div className="pt-10">
                            {products.length > 0 ? (
                                <Slider {...settings}>
                                    {products
                                        .filter((product) => product.category === "furnitures")
                                        .map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                </Slider>
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                    </div>

                    <ToastContainer position="bottom-center" autoClose={3000} />
                </>
            )}
        </>
    );
}
