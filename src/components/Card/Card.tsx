import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardProps {
  item: {
    title: string;
    description: string;
    imagePath?: string;
  };
}

function Card({ item }: CardProps) {
  return (
    <div className=" rounded-md shadow-sm shadow-slate-600" data-testid="card">
      {item.imagePath && (
        <div className="">
          <LazyLoadImage
            alt={item.title}
            src={item.imagePath}
            width={200}
            height={130}
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold text-white">{item.title}</h2>
        <p className="text-sm text-gray-300">{item.description}</p>
      </div>
    </div>
  );
}

export default Card;
