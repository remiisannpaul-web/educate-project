import Link from "next/link";


async function getPrograms() {
  try {
    const res = await fetch("http://localhost:3000/api/programs", {
      cache: "no-store",
    }); // changed
    if (!res.ok) {
      throw new Error("Failed to fetch programs");
    }
    return res.json();
  } catch (e) {
    console.error("Error fetching programs:", e);
    return [];
  }
}


export default async function ProgramsList() {
  const programs = await getPrograms()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {programs.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No programs available at the moment.
        </div>
      ) : (
        programs.map((program) => (
          <div
            key={program._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {program.title}
            </h3>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Duration: {program.duration}</span>
                <span>Level: {program.level}</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">
                {program.category}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-semibold">
                ${program.price}
              </span>
              <Link
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                href={`/programs/${program._id}`}
              >
                Learn More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
