import Link from 'next/link'
import Slider from "react-slick";

export default function Category() {
    const categories = [
        {
            id: 1,
            name: "Phones",
            imageUrl:
                "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 2,
            name: "Laptops",
            imageUrl:
                "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 3,
            name: "Clothes",
            imageUrl:
                "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 4,
            name: "Shoes",
            imageUrl:
                "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 5,
            name: "Electronics",
            imageUrl:
                "https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 6,
            name: "kids",
            imageUrl:
                "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
    };

    return (
        <div className="container mx-auto my-8">
            <h2 className="p-2 text-gray-800 font-bold text-left text-xl">
                Browse by Category
            </h2>
            <Slider {...sliderSettings}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-3  max-w-[200px] rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
                    >
                        <Link href={`/products`} className=" cursor-pointer">
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-32 object-cover mb-4 rounded-md"
                            />
                        </Link>
                        <h2 className="text-lg text-gray-800 font-bold">{category.name}</h2>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
