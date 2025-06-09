import { useParams } from "react-router-dom";

function ToolPage() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <h1 className="text-3xl font-bold">You opened the tool: {slug}</h1>
    </div>
  );
}

export default ToolPage;
