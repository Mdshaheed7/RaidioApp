<<<<<<< HEAD
<<<<<<< HEAD
import RadioPlayer from '@/components/radio-player';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24">
      <RadioPlayer />
    </main>
=======
import Image from "next/image";
=======
import RadioPlayer from '@/components/radio-player';
>>>>>>> d1b7c5d (Your commit message here)

const HomePage = () => {
  return (
    <div>
      {/* Navy Blue Container */}
      <div className="bg-navy-600 py-4 flex justify-center">
        <img src="https://svym.org/wp-content/uploads/2022/05/SVYM-logo-panel-blue-480x82.jpg" alt="Radio Station Logo" className="h-12" />
      </div>

      {/* Add margin below the navy blue container */}
      <div className="mb-6" /> {/* Adjust the value (mb-6) as needed for more or less space */}

      <RadioPlayer />
    </div>
>>>>>>> c10d60c (Initial commit from Create Next App)
  );
};

export default HomePage;
