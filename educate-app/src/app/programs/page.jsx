import ProgramsList from "@/components/ProgramsList";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black bg-gray-50">
      {/* Header */}
      <div className="text-white py-12">
        <div className="container mx-auto px-6">
        </div>
      </div>

      {/* Programs List */}
      <div className="container mx-auto py-8">
        <ProgramsList />
      </div>
    </div>
  );
}
