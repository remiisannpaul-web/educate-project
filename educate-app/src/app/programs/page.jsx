import ProgramsList from "@/components/ProgramsList";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-900 to-black text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Programs</h1>
          <p className="text-xl text-blue-200">
            Discover our comprehensive educational programs designed for the digital age
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="container mx-auto py-8">
        <ProgramsList />
      </div>
    </div>
  );
}
