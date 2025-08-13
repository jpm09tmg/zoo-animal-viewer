'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Mammals(){
    const animals =[
        {name:"African Lion", img:"/app/mammal/images/lion.jpg"},
        {name:"Bengal Tiger", img:"/app/mammal/images/tiger.jpg"},
        {name:"African Elephant", img:"/app/mammal/images/elephant.jpg"},
        {name:"Masai Giraffe", img:"/app/mammal/images/giraffe.jpg"},
        {name:"American Black Bear", img:"/app/mammal/images/bear.jpg"},
        {name:"Giant Panda", img:"/app/mammal/images/panda.jpg"},
        {name:"Eastern Grey Kangaroo", img:"/app/mammal/images/kangaroo.jpg"},
        {name:"Gray Wolf", img:"/app/mammal/images/wolf.jpg"},
        {name:"Zebra", img:"/app/mammal/images/zebra.jpg"},
        {name:"White Rhino", img:"/app/mammal/images/rhino.jpg"},
        {name:"Hippopotamus", img:"/app/mammal/images/hippo.jpg"},
        {name:"Red Kangaroo", img:"/app/mammal/images/red-kangaroo.jpg"},
        {name:"Snow Leopard", img:"/app/mammal/images/snow-leopard.jpg"},
        {name:"Chimpanzee", img:"/app/mammal/images/chimpanzee.jpg"}
    ]

    return(
        <>
        <Header />
        <Navbar />
            <main className="max-w-6xl mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Mammals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                
                    <div key={animals.name} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
                        <div className="h-49 w-full bg-gray-200 flex items-center justify-center">
                             <img src={animal.img} alt={animal.name} className="object-cover h-full w-full" />
                        </div>
                        <div className="p-4 text-center bg-green-100 hover:bg-green-200 transition">
                            <span className="text-lg font-semibold">{animal.name}</span>
                        </div>
                    </div>

                    <div key={animals[1].name} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
                        <div className="h-49 w-full bg-gray-200 flex items-center justify-center">
                             <img src={animals[1].img} alt={animals[1].name} className="object-cover h-full w-full" />
                        </div>
                        <div className="p-4 text-center bg-green-100 hover:bg-green-200 transition">
                            <span className="text-lg font-semibold">{animal.name}</span>
                        </div>
                    </div>

                    <div key={animals[2].name} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
                        <div className="h-49 w-full bg-gray-200 flex items-center justify-center">
                             <img src={animals[2].img} alt={animals[2].name} className="object-cover h-full w-full" />
                        </div>
                        <div className="p-4 text-center bg-green-100 hover:bg-green-200 transition">
                            <span className="text-lg font-semibold">{animals[2].name}</span>
                        </div>
                    </div>

                    <div key={animals[3].name} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
                        <div className="h-49 w-full bg-gray-200 flex items-center justify-center">
                             <img src={animals[3].img} alt={animals[3].name} className="object-cover h-full w-full" />
                        </div>
                        <div className="p-4 text-center bg-green-100 hover:bg-green-200 transition">
                            <span className="text-lg font-semibold">{animals[3].name}</span>
                        </div>
                    </div>

                    <div key={animals[4].name} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
                        <div className="h-49 w-full bg-gray-200 flex items-center justify-center">
                             <img src={animals[4].img} alt={animals[4].name} className="object-cover h-full w-full" />
                        </div>
                        <div className="p-4 text-center bg-green-100 hover:bg-green-200 transition">
                            <span className="text-lg font-semibold">{animals[4].name}</span>
                        </div>
                    </div>
                
                </div>
            </main>
        <Footer />
        </>
    )
}