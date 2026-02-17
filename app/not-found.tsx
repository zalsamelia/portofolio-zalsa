import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h2 className="text-4xl font-bold font-playfair mb-4 text-deep-plum">Not Found</h2>
            <p className="text-lg mb-8 text-gray-600">Could not find requested resource</p>
            <Link href="/" className="px-6 py-3 bg-deep-plum text-white rounded-full hover:bg-opacity-90 transition-colors">
                Return Home
            </Link>
        </div>
    );
}
